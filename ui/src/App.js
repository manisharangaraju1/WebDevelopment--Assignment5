/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/ProductList';

const contentNode = document.getElementById('contents');

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<ProductList />, contentNode);
