import React from 'react';
import {Route, Redirect} from 'react-router';
import App from './templates/App.js';
import Home from './templates/Home.js';
import NotFound from './templates/NotFound.js';

module.exports = (
  <Route component={App}>
       <Route path='/' component={Home}/>
       <Route path='/404' component={NotFound}/>
</Route>
)
