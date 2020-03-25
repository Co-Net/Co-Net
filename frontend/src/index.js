
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
import signin from './signin';
import Profile from './Profile';
import Forum from './Forum';
import editProfile from './editProfile';
import history from './history';
import forumPost from './forumPost';



const routing = (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/signup" component={signup} />
        <Route path="/pic" component={PicUpload} />
        <Route path="/testlogout" component={testLogout} />
        <Route path="/signin" component={signin} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Forum" component={Forum} />
        <Route path="/editProfile" component={editProfile} />
        <Route path="/forumPost" component={forumPost} />








      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();