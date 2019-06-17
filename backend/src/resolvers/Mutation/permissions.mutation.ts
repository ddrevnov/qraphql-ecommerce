import { Context, hasPermission } from '../../utils';
import { User } from '../../generated/prisma-client';

const updatePermissions = async (
  parent,
  { permissions, userId },
  { db, request }: Context,
  info
): Promise<User> => {
  if (!request.userId) {
    throw new Error('You must be logged in');
  }

  const currentUser = await db.query.user(
    {
      where: {
        id: request.userId
      }
    },
    info
  );

  hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

  return db.mutation.updateUser({
    data: {
      permissions: {
        set: permissions
      }
    },
    where: {
      id: userId
    }
  });
};

export default {
  updatePermissions
};
