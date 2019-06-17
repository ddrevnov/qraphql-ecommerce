import auth from "./auth.mutation";
import item from "./item.mutation";
import permissions from "./permissions.mutation";

const Mutation = {
  ...auth,
  ...item,
  ...permissions
};

export default Mutation;
