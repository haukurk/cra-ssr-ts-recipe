import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { SystemState } from './reducers/system';

export interface SystemStore {
  system: SystemState;
  posts: any;
  comment: any;
}

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export default function configureStore(initialState: any = {}) {
  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = [applyMiddleware(...middlewares)];
  if (typeof window !== 'undefined') { 
    if (window.__REDUX_DEVTOOLS_EXTENSION__) { 
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    } 
  }

  // tslint:disable-next-line:no-console
  console.log(initialState);

  const store: any = createStore(reducers,
                                 initialState, 
                                 compose(...enhancers));

  store.asyncReducers = {}; // Async reducer registry

  return store;
}
