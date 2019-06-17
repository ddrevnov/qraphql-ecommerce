import * as React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { UPDATE_PERMISSIONS_MUTATION, USERS_QUERY } from "../shared/queries";
import { Button, Checkbox, Table } from "antd";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces";

const Permissions = () => {
  const [dataSource, setDataSource] = useState([]);
  const [permissions, setPermissions] = useState<any>([]);
  const update = useMutation(UPDATE_PERMISSIONS_MUTATION);

  const { data, error, loading } = useQuery(USERS_QUERY);

  const updatePermissions = async (row: any) => {
    const permission = permissions.find((p: any) => p.userId === row.user.id);
    if (permission) {
      await update({ variables: permission });
    }
  };

  const renderCheckbox = (text: string, row: any) => (
    <Checkbox
      onChange={e => {
        setPermissions(
          permissions.map((permission: any) => {
            if (permission.userId === row.user.id) {
              let newPermissions = [];

              if (e.target.checked) {
                newPermissions = [...permission.permissions, text];
              } else {
                newPermissions = permission.permissions.filter(
                  (p: string) => p !== text
                );
              }

              return {
                userId: permission.userId,
                permissions: newPermissions
              };
            }
            return {
              userId: permission.userId,
              permissions: permission.permissions
            };
          })
        );
      }}
      defaultChecked={row.user.permissions.includes(text)}
    />
  );

  useEffect(() => {
    const updateRow = (user: IUser) => ({
      key: user.id,
      user,
      email: user.email,
      ADMIN: "ADMIN",
      USER: "USER",
      ITEMCREATE: "ITEMCREATE",
      ITEMUPDATE: "ITEMUPDATE",
      ITEMDELETE: "ITEMDELETE",
      PERMISSIONUPDATE: "PERMISSIONUPDATE"
    });

    if (!loading && !error && !dataSource.length) {
      setPermissions(
        data.users.map((user: IUser) => ({
          userId: user.id,
          permissions: user.permissions
        }))
      );
      setDataSource(data.users.map(updateRow));
    }
  }, [loading, dataSource]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "ADMIN",
      dataIndex: "ADMIN",
      render: renderCheckbox
    },
    {
      title: "USER",
      dataIndex: "USER",
      render: renderCheckbox
    },
    {
      title: "ITEMCREATE",
      dataIndex: "ITEMCREATE",
      render: renderCheckbox
    },
    {
      title: "ITEMUPDATE",
      dataIndex: "ITEMUPDATE",
      render: renderCheckbox
    },
    {
      title: "ITEMDELETE",
      dataIndex: "ITEMDELETE",
      render: renderCheckbox
    },
    {
      title: "PERMISSIONUPDATE",
      dataIndex: "PERMISSIONUPDATE",
      render: renderCheckbox
    },
    {
      title: "Update permissions",
      dataIndex: "updatePermissions",
      render(text: string, row: any) {
        return (
          <Button type="primary" onClick={() => updatePermissions(row)}>
            Update
          </Button>
        );
      }
    }
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default Permissions;
