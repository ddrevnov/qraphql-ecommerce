import { forwardTo } from 'prisma-binding';
import { Context } from '../utils';

const Query = {
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  item: forwardTo('db'),
  users: forwardTo('db'),
  user: forwardTo('db'),
  me(parent, { email, password, name }, { db, request }: Context, info) {
    if (!request.userId) {
      return null;
    }

    return db.query.user(
      {
        where: {
          id: request.userId
        }
      },
      info
    );
  }
};

export default Query;
