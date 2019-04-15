import * as bcrypt from 'bcryptjs';

import { FileUpload, Context, auth } from '../utils';
import { Item, User } from '../generated/prisma-client';

const Mutation = {
  async createItem(parent, { data }, { db }: Context, info): Promise<Item> {
    let image = null;

    if (data.image) {
      const fileUpload = new FileUpload(data.image);
      image = await fileUpload.processUpload();
    }

    const item = await db.mutation.createItem(
      {
        data: {
          ...data,
          image
        }
      },
      info
    );

    return item;
  },
  async updateItem(
    parent,
    { data, where },
    { db }: Context,
    info
  ): Promise<Item> {
    const item = await db.mutation.updateItem({ data, where }, info);
    return item;
  },
  async deleteItem(parent, { where }, { db }: Context, info): Promise<Item> {
    const item = await db.mutation.deleteItem({ where }, info);
    return item;
  },
  async signUp(
    parent,
    { email, password, name },
    { db, response }: Context,
    info
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.mutation.createUser(
      {
        data: {
          password: hashedPassword,
          email,
          name,
          permissions: { set: ['USER'] }
        }
      },
      info
    );

    const token = auth.generateToken(user.id);
    auth.setCookie(response, token);

    return user;
  },
  async signIn(
    parent,
    { email, password },
    { db, response }: Context,
    info
  ): Promise<User> {
    const user = await db.query.user({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = auth.generateToken(user.id);
    auth.setCookie(response, token);

    return user;
  },
  signOut(parent, args, { response }: Context) {
    response.clearCookie('token');
    return { message: 'Goodbye!' };
  }
};

export default Mutation;
