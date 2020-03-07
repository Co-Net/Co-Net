
// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Feed from './Feed';
import * as registerServiceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from "react-router-dom";
import signup from './signup';
import PicUpload from './PicUpload';
import testLogout from './TestLogout';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/signup" component={signup} />
        <Route path="/pic" component={PicUpload} />
        <Route path="/testlogout" component={testLogout} />
      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();