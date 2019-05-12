import { Context, FileUpload } from '../../utils';
import { Item } from '../../generated/prisma-client';

const createItem = async (
  parent,
  { data },
  { db }: Context,
  info
): Promise<Item> => {
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
};

const updateItem = async (
  parent,
  { data, where },
  { db }: Context,
  info
): Promise<Item> => {
  const item = await db.mutation.updateItem({ data, where }, info);
  return item;
};

const deleteItem = async (
  parent,
  { where },
  { db }: Context,
  info
): Promise<Item> => {
  const item = await db.mutation.deleteItem({ where }, info);
  return item;
};

export default {
  createItem,
  updateItem,
  deleteItem
};
