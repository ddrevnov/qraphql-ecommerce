import { forwardTo } from 'prisma-binding';

const users = forwardTo('db');
const user = forwardTo('db');

export default {
  users,
  user
};
