import auth from './auth.query';
import item from './item.query';
import user from './user.query';

const Query = {
  ...auth,
  ...item,
  ...user
};

export default Query;
