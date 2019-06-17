import { User, Permission } from '../generated/prisma-client';

const hasPermission = (user: User, permissionsNeeded: Permission[]): void => {
  const matchedPermissions = user.permissions.filter((permissionTheyHave) =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions
      : ${permissionsNeeded}
      You Have:
      ${user.permissions}
      `);
  }
};

export default hasPermission;
