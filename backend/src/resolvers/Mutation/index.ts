import auth from './auth.mutation';
import item from './item.mutation';

const Mutation = {
  ...auth,
  ...item
};

export default Mutation;
