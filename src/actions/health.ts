import { RECEIVED, FAILED, REQUESTING } from '../types/health';
import { SystemStore } from '../store';
var ExecutionEnvironment = require('exenv');

function successHealthCheck(status: string) {
  return {
    type: RECEIVED,
    status
  };
}

function requestingHealthCheck() {
  return {
    type: REQUESTING
  };
}

function failedHealthCheck(error: any) {
  return {
    type: FAILED,
    error: error
  };
}

export function requestHealthCheck() {
  
  // tslint:disable-next-line:no-console
  console.log('Trigger check health');
  return (dispatch: any) => {
    dispatch(requestingHealthCheck());
    let uriEndpoint = `/api/healthy`;
    if (!ExecutionEnvironment.canUseDOM) { // Fetch can't work relatively when running on server.
      uriEndpoint = `http://localhost:3101/api/healthy`; // TODO ENV for full URI
    }
    return fetch(uriEndpoint)
      .then(response => response.text())
      .then(response => dispatch(successHealthCheck(response)))
      .catch(error => dispatch(failedHealthCheck(error)));
  };
}

export function shouldCheck(state: SystemStore) {
  const status = state.system.status;
  // tslint:disable-next-line:no-console
  console.log(state);

  if (!status) {
    return true;
  }

  return true;
}

export function fetchHealthIfNotChecked() {
  return (dispatch: any, getState: any) => {
    if (shouldCheck(getState())) {
      return dispatch(requestHealthCheck());
    }
  };
}
