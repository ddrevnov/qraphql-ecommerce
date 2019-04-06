import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IndexPage, ItemsPage, ItemPage, AdminPage } from './pages';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/items" exact component={ItemsPage} />
      <Route path="/items/:id" exact component={ItemPage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
};

export default Router;
