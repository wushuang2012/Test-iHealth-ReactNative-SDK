// state
const initialState = {
  response: ''
}

let mDispatch;

// Actions
export const types = {
  SET: 'testDevice/set'
}

export function testAPI(api, apiname, mac) {
  return (dispatch, getState) => {
    mDispatch = dispatch;
    const fn = Reflect.get(api, apiname);
    fn(mac);
  }
}

export function setResponse(response) {
  const payload = { response };
  if(mDispatch) mDispatch({ type: types.SET, payload });
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET:
      return handleResult(action, state);
    default:
      return state;
  }
}

// handler
function handleResult(action, state) {
  const { response } = action.payload;
  return {
    ...state,
    response
  }
}

