/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Contents from './components/Contents';


const contentNode = document.getElementById('contents');
const element = (
  <Router>
    <Contents />
  </Router>
);

if (module.hot) {
  module.hot.accept();
}


ReactDOM.render(element, contentNode);
