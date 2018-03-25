import { 
  RECEIVED as HEALTH_RECEIVED, 
  REQUESTING as HEALTH_REQUESTING,
  FAILED as HEALTH_FAILED
  } from '../types/health';

export type SystemState = {
  readonly status: string;
  readonly status_failed: boolean;
  readonly status_requesting: boolean;
};

const initialState: SystemState = {
  status: '',
  status_requesting: false,
  status_failed: false
};

export default function reducer(state: SystemState = initialState, action: any) {
  switch (action.type) {
    case HEALTH_RECEIVED:
      return Object.assign({}, state, {
        status: action.status,
        status_failed: false,
        status_requesting: false
      });
    case HEALTH_REQUESTING:
      return Object.assign({}, state, {
        status_requesting: true,
        status_failed: false
      });
    case HEALTH_FAILED:
      return Object.assign({}, state, {
        status_requesting: false,
        status_failed: true
      });
    default:
      return state;
  }
}
