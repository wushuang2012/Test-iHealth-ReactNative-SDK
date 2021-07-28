import _ from 'lodash';
import iHealthAPI from '../api/iHealthAPI';
import deviceAPIs from '../api/getAPIs';

let mDispatch;

// state
const initialState = {
  findDevices: [],
  connectedDevices: [],
  testDevice: ''
}

// Actions
export const types = {
  FOUND: 'FindDevice/found',
  CONNECTED: 'FindDevice/connected',
  TEST: 'FindDevice/test',
  CHECK: 'FindDevice/check',
  CLEAR_FOUND: 'FindDevice/clearfound',
  CLEAR_CONNECTED: 'FindDevice/clearconnected'
}

export function searchDevice(type) {
  return (dispatch, getState) => {
    mDispatch = dispatch;
    dispatch({ type: types.CLEAR_FOUND })
    iHealthAPI.findDevice(type);
  }
}

export function cleanFoundDevice() {
  return (dispatch, getState) => {
    dispatch({ type: types.CLEAR_FOUND })
  }
}

export function cleanConnectedDevice() {
  return (dispatch, getState) => {
    dispatch({ type: types.CLEAR_CONNECTED })
  }
}

export function connectDevice(mac, type) {
  return (dispatch, getState) => {
    mDispatch = dispatch;
    iHealthAPI.connectDevice(mac, type);
  }
}

export function foundDevice(mac, type) {
  const payload = { mac, type };
  if (mDispatch) mDispatch({ type: types.FOUND, payload });
}

export function connectedDevice(mac, type) {
  const payload = { mac, type };
  if (mDispatch) mDispatch({ type: types.CONNECTED, payload });
}

export function checkConnectedDevice(macs, type) {
  const payload = { macs, type };
  if (mDispatch) mDispatch({ type: types.CHECK, payload });
}

export function testDevice(mac) {
  const payload = { mac };
  return { type: types.TEST, payload }
}

export function getConnected(type) {
  return (dispatch, getState) => {
    mDispatch = dispatch;
    const api = deviceAPIs.getDeviceAPI(type).apis;
    console.log(api);
    const fn = Reflect.get(api, 'getAllConnectedDevices');
    fn();
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FOUND:
      return handleFoundDevice(action, state);

    case types.CONNECTED:
      return handleConnectedDevice(action, state);

    case types.CHECK:
      return handleCheckDevice(action, state);

    case types.TEST:
      return handleTestDevice(action, state);

    case types.CLEAR_FOUND:
      return handleCleanFound(action, state);

    case types.CLEAR_CONNECTED:
    return handleCleanConnected(action, state);

    default:
      return state;
  }
}

// handler
function handleFoundDevice(action, state) {
  const { mac, type } = action.payload;
  let tempDevices = Object.assign([], state.findDevices);
  console.log(tempDevices);
  if (!_.includes(state.findDevice, mac)) {
    tempDevices.push({ mac, type });
  }
  console.log(tempDevices);
  return {
    ...state,
    findDevices: tempDevices
  }
}

function handleConnectedDevice(action, state) {
  const { mac, type } = action.payload;
  return {
    ...state,
    connectedDevices: state.connectedDevices.concat({mac, type})
  }
}

function handleCheckDevice(action, state) {
  const { macs, type } = action.payload;
  const tempDevices = Object.assign([], state.connectedDevices);
  console.log(tempDevices);
  _.forEach(macs, (mac) => {
   if (!_.find(tempDevices, { 'mac': mac })) {
    tempDevices.push({ mac, type });
   }
  });

  console.log(tempDevices);

  return {
    ...state,
    connectedDevices: tempDevices
  }
}

function handleTestDevice(action, state) {
  const { mac } = action.payload;
  console.log("handleTestDevice: " + mac);
  return {
    ...state,
    testDevice: state.testDevice = mac
  }
}

function handleCleanFound(action, state) {
  return {
    ...state,
    findDevices: []
  }
}

function handleCleanConnected(action, state) {
  return {
    ...state,
    connectedDevices: []
  }
}

