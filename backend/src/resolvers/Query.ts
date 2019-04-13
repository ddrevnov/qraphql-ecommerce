import { forwardTo } from 'prisma-binding';

const Query = {
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  item: forwardTo('db'),
  users: forwardTo('db')
};

export default Query;
