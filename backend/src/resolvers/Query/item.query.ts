import { forwardTo } from 'prisma-binding';

const items = forwardTo('db');
const itemsConnection = forwardTo('db');
const item = forwardTo('db');

export default {
  items,
  itemsConnection,
  item
};
