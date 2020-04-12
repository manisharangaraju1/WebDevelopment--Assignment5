import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import ProductImage from './ProductImage';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route exact path="/products" component={ProductList} />
      <Route exact path="/edit/:id" component={ProductEdit} />
      <Route exact path="/image/:url" component={ProductImage} />
      <Route component={NotFound} />
    </Switch>
  );
}
