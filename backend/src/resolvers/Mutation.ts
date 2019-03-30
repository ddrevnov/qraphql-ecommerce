import { FileUpload, Context } from '../utils';
import { Item } from '../generated/prisma-client';

const Mutation = {
  async createItem(parent, { data }, { db }: Context, info): Promise<Item> {
    const fileUpload = new FileUpload(data.image);
    const fileUrl = await fileUpload.processUpload();
    const item = await db.mutation.createItem(
      {
        data: {
          ...data,
          image: fileUrl
        }
      },
      info
    );

    return item;
  }
};

export default Mutation;
