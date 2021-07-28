import { PermissionsAndroid } from 'react-native';
import iHealthAPI from '../api/iHealthAPI';

let mDispatch = null;

// state
const initialState = {
  selectDevice: '',
  isRegister: false,
  isPermission: false
}

// Actions
export const types = {
  SET_TYPE: 'SelectDevice/settype',
  SET_REGISTER: 'SelectDevice/setRegister',
  SET_PERMISSION: 'SelectDeivce/setPermission'
}

export function register() {
  return (dispatch, getState) => {
    mDispatch = dispatch
    iHealthAPI.authenConfigureInfo();
  }
}

export function checkLicense() {
  return (dispatch, getState) => {
    mDispatch = dispatch
    iHealthAPI.sdkAuthWithLicense('com_testihealthlibrary_android.pem');
  }
}

export function checkPermission() {
  var permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ];
  return (dispatch, getState) => {
    PermissionsAndroid.requestMultiple(permissions).then((granted) => {
      const payload = { isPermission: granted };
      dispatch({ type: types.SET_PERMISSION, payload });
    })
  }
}

export function setDevice(deviceType) {
  const payload = { deviceType };
  return { type: types.SET_TYPE, payload };
}

export function setRegister(isRegister) {
  const payload = { isRegister };
  mDispatch({ type: types.SET_REGISTER, payload });
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_TYPE:
      return handleSetDevice(action, state);

    case types.SET_REGISTER:
      return handleSetRegister(action, state);

    case types.SET_PERMISSION:
      return handleSetPermisson(action, state);

    default:
      return state;
  }
}

// handler
function handleSetDevice(action, state) {
  const { deviceType } = action.payload;
  return {
    ...state,
    selectDevice: deviceType
  }
}

function handleSetRegister(action, state) {
  const { isRegister } = action.payload;
  return {
    ...state,
    isRegister
  }
}

function handleSetPermisson(action, state) {
  const { isPermission } = action.payload;
  console.log(action.payload);
  return {
    ...state,
    isPermission
  }
}
