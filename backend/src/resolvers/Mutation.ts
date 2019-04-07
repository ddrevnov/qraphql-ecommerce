import { FileUpload, Context } from '../utils';
import { Item } from '../generated/prisma-client';

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
  }
};

export default Mutation;
