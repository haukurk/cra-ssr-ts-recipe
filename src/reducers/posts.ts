import { RECEIVE } from '../types/posts';

const initialState = {
  items: []
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case RECEIVE:
      return Object.assign({}, state, {
        items: action.posts
      });
    default:
      return state;
  }
}
