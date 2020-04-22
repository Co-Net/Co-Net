
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
import history from './history';
import ForumPost from './forumPost';
import CreateForumPost from './createForumPost';
import editForumPost from './editForumPost';
import AccountSettings from './AccountSettings';
import Messages from './messages';
import Game from './game';
import ForumPostGuest from './forumPostGuest';


const routing = (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/signup" component={signup} />
        <Route path="/pic" component={PicUpload} />
        <Route path="/testlogout" component={testLogout} />
        <Route path="/signin" component={signin} />
        <Route exact path="/Profile" render={(props) => <Profile {...props} ownProfile={true}/>} />
        <Route exact path="/Profile/:username" render={(props) => <Profile {...props} ownProfile={false}/>} />
        <Route path="/Forum" component={Forum} />
        <Route exact path="/forumPost/:postID" render={(props) => <ForumPost {...props}/>} />
        <Route path="/createForumPost" component={CreateForumPost} />
        <Route path="/editForumPost" component={editForumPost} />
        <Route path="/myaccount" component={AccountSettings} />
        <Route path="/messages" component={Messages} />
        <Route path="/game" component={Game} />















      </div>
    </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker.unregister();