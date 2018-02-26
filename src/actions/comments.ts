import { RECEIVE } from '../types/comment';

function receiveComments(postid: any, json: any) {
  return {
    type: RECEIVE,
    postid,
    comments: json
  };
}

function fetchComments(postid: any) {
  return (dispatch: any) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${postid}/comments`
    )
      .then(response => response.json())
      .then(json => dispatch(receiveComments(postid, json)));
  };
}

function shouldFetchComments(postid: any, state: any) {
  const comments = state.comments.byPost[postid];

  if (!comments) {
    return true;
  }
  if (comments.items) {
    return false;
  }

  return true;
}

export function fetchCommentsIfNeeded(postid: any) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchComments(postid, getState())) {
      return dispatch(fetchComments(postid));
    }
  };
}
