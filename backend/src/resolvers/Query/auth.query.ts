import { Context } from '../../utils';

const me = (
  parent,
  { email, password, name },
  { db, request }: Context,
  info
) => {
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
};

export default {
  me
};
