import { combineReducers } from 'redux';

import posts, { PostsState } from './posts';
import comments, { CommentState } from './comment';
import system, { SystemState } from './system';

export interface RootState {
  system: SystemState;
  comments: CommentState;
  posts: PostsState;
}

export default combineReducers({
  posts,
  comments,
  system
});
