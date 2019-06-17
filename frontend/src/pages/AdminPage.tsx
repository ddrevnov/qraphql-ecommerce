import React from "react";
import { Typography, Button } from "antd";
import { Switch, Route, RouteComponentProps, NavLink } from "react-router-dom";

import CreateItem from "../components/CreateItem";
import UpdateItem from "../components/UpdateItem";
import Permissions from "./Permissions";

const { Title } = Typography;

export const AdminPage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <div>
      <Title>Admin</Title>
      <Button>
        <NavLink to={`${match.path}/createItem`}>Create item</NavLink>
      </Button>
      <Button>
        <NavLink to={`${match.path}/permissions`}>Update permissions</NavLink>
      </Button>
      <Switch>
        <Route path={`${match.path}/createItem`} component={CreateItem} />
        <Route path={`${match.path}/updateItem/:id`} component={UpdateItem} />
        <Route path={`${match.path}/permissions`} component={Permissions} />
      </Switch>
    </div>
  );
};
