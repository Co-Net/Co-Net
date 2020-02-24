
// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import * as registerServiceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/Login" component={Login} />
      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();