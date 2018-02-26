import { RECEIVE } from '../types/posts';

function receivePosts(json: any) {
  return {
    type: RECEIVE,
    posts: json
  };
}

function fetchPosts() {
  return (dispatch: any) => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}

function shouldFetchPosts(state: any) {
  const posts = state.posts;

  if (posts.items) {
    return false;
  }

  return true;
}

export function fetchPostsIfNeeded() {
  return (dispatch: any, getState: any) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
}
