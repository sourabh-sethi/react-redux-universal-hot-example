const LOAD = 'redux-example/webinar/details/LOAD';
const LOAD_SUCCESS = 'redux-example/webinar/details/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/webinar/details/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      let details;
      if (action.result && action.result.data) {
        details = action.result.data;
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        details,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.webinarDetails && globalState.webinarDetails.loaded;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/v1/v1/class/webinar/detail/' + id) // params not used, just shown as demonstration
  };
}
