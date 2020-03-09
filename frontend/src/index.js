
// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Feed from './Feed';
import * as registerServiceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";
import signup from './signup';
import signin from './signin';
import Profile from './Profile';
import Forum from './Forum';


const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/Login" component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/signup" component={signup} />
        <Route path="/signin" component={signin} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Forum" component={Forum} />





      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();