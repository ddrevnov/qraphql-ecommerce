import { forwardTo } from 'prisma-binding';

const Query = {
  items: forwardTo('db')
};

export default Query;
