
// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as registerServiceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker.unregister();