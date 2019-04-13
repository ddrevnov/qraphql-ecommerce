import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { FileUpload, Context } from '../utils';
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
  async signup(
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

    console.log({ user });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    return user;
  }
};

export default Mutation;
