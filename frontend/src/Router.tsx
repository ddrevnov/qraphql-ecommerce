import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  IndexPage,
  ItemsPage,
  ItemPage,
  AdminPage,
  SignupPage,
  SigninPage,
  ResetPasswordRequest,
  ResetPassword
} from './pages';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/signUp" exact component={SignupPage} />
      <Route path="/signIn" exact component={SigninPage} />
      <Route path="/items" exact component={ItemsPage} />
      <Route path="/items/:id" exact component={ItemPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/resetPasswordRequest" component={ResetPasswordRequest} />
      <Route path="/reset/:token" component={ResetPassword} />
    </Switch>
  );
};

export default Router;
