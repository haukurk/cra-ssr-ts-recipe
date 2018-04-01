import { RECEIVE } from '../types/comment';

export interface CommentState {
  [byPost: string]: Array<Comment> | {};
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const initialState = {
  byPost: {}
};

export default function reducer(state: CommentState = initialState, action: any) {
  let comments;
  switch (action.type) {
    case RECEIVE:
      comments = Object.assign({}, state.byPost);
      return Object.assign({}, state, {
        byPost: Object.assign(comments, {
          [action.postid]: {
            items: action.comments
          }
        })
      });
    default:
      return state;
  }
}
