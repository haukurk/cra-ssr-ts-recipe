import { RECEIVE } from '../types/comment';

export interface CommentState {

}

const initialState = {
  byPost: {}
};

export default function reducer(state: any = initialState, action: any) {
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
