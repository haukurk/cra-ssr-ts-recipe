import { RECEIVE } from '../types/health';

function successHealthCheck(status: string) {
  return {
    type: RECEIVE,
    status
  };
}

export function requestHealthCheck() {
  return (dispatch: any) => {
    return fetch(
      `/api/healthy`
    )
      .then(response => response.text())
      .then(response => dispatch(successHealthCheck(response)));
  };
}