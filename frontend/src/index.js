
// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Feed from './Feed';
import * as registerServiceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/Register" component={Login} />
        <Route path="/Feed" component={Feed} />
      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();