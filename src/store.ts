import { createStore, applyMiddleware, compose } from 'redux';
import reducers, { RootState } from './reducers';
import thunkMiddleware from 'redux-thunk';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export default function configureStore(ssrState: RootState | {} = {}) {
  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = [applyMiddleware(...middlewares)];
  if (typeof window !== 'undefined') { 
    if (window.__REDUX_DEVTOOLS_EXTENSION__) { 
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    } 
  }

  const store: any = createStore(reducers,
                                 ssrState, 
                                 compose(...enhancers));
            
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
