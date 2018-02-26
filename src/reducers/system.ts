import { RECEIVE as HEALTH_RECEIVE } from '../types/health';

const initialState = {
  status: ''
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case HEALTH_RECEIVE:
      return Object.assign({}, state, {
        status: action.status
      });
    default:
      return state;
  }
}
