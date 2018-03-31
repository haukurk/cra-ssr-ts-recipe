import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Base64 } from 'js-base64';

import configureStore from './store';
import './index.css';
import App from './containers/App';

// If provided by server, use it, else let the reducers handle initial state
// tslint:disable-next-line:no-any
const initialState = ((window as any).DATA !== null && (window as any).DATA !== '{{WINDOW_DATA}}') 
  ? Base64.decode((window as any).DATA) : '{}';

const store = configureStore(JSON.parse(initialState));

ReactDOM.hydrate(
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
 </Provider>,
  document.getElementById('root') as HTMLElement
);
