import { RECEIVE } from '../types/posts';

export type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsState = {
  items: Array<Posts> | null;
};

const initialState: PostsState = {
  items: null
};

export default function reducer(state: PostsState = initialState, action: any) {
  switch (action.type) {
    case RECEIVE:
      return Object.assign({}, state, {
        items: action.posts
      });
    default:
      return state;
  }
}
