import { combineReducers } from 'redux';

import posts from './posts';
import comments from './comment';
import system from './system';

export default combineReducers({
  posts,
  comments,
  system
});
