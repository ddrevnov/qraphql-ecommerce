import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index';
import Items from './components/Items';
import Sell from './components/Sell';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/items" component={Items} />
      <Route path="/sell" component={Sell} />
    </Switch>
  );
};

export default Router;
