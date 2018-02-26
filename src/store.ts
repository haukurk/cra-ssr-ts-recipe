import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState: any = {}) {
  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store: any = createStore(reducers, initialState, compose(...enhancers));

  store.asyncReducers = {}; // Async reducer registry

  return store;
}
