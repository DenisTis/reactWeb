'use strict';

// Import React base modules
import React from 'react';
import ReactDom from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
//eslint-disable-next-line
import Bootstrap from "bootstrap/dist/css/bootstrap.css";

//Views
import Home from './components/Home.jsx';
import Menu from './components/Menu.jsx';
import NotFound from './components/NotFound.jsx';
import MapNavigation from './components/MapNavigation.jsx';
import TalkDialog from './components/TalkDialog.jsx';

ReactDom.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/map" component={MapNavigation} />
      <Route path="/talk" component={TalkDialog} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  // Here is how query can be hidden: https://stackoverflow.com/questions/42089626/how-to-hide-query-string-parameter-in-reactjs-react-router
  // Check this code in Navigation object it if will be possible to hide final url
  //   .makePath('about') // return URL
  //   .makeHref('about') // return URL

  document.getElementById('root')
);
