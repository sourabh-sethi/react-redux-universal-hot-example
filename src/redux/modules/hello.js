const LOAD = 'redux-example/hello/LOAD';
const LOAD_SUCCESS = 'redux-example/hello/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/hello/LOAD_FAIL';

const LOAD_MORE = 'redux-example/hello/LOAD_MORE';
const LOAD_MORE_SUCCESS = 'redux-example/hello/LOAD_MORE_SUCCESS';
const LOAD_MORE_FAIL = 'redux-example/hello/LOAD_MORE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  result: [],
  meta: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      let result = [];
      let meta = {};
      if(action.result && action.result.data)
      {
        result = action.result.data.result;
        meta = action.result.data.meta;
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        result,
        meta,
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
    case LOAD_MORE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MORE_SUCCESS:
      let { result: resultMore, meta: metaMore} = state;
      let actionResult = action.result;
      if(actionResult && actionResult.data)
      {
        let data = actionResult.data;
        resultMore.push(...data.result);
        metaMore = data.meta;
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        result: resultMore,
        meta: metaMore,
        error: null
      };
    case LOAD_MORE_FAIL:
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
  return globalState.hello && globalState.hello.loaded;
}

export function load(pageSize = 10, page = 0) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/v1/v1/class/esp/webinars/0?page=' + page + '&pageSize=' + pageSize) // params not used, just shown as demonstration
  };
}

export function loadMore(pageSize = 10, page = 1) {
  return {
    types: [LOAD_MORE, LOAD_MORE_SUCCESS, LOAD_MORE_FAIL],
    promise: (client) => client.get('/v1/v1/class/esp/webinars/0?page=' + page + '&pageSize=' + pageSize) // params not used, just shown as demonstration
  };
}
