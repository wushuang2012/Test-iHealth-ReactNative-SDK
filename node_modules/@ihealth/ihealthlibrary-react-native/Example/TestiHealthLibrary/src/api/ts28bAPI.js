import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  TS28BModule,
  TS28BProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'TS28B API';

export default {

  apis: {

    getAllConnectedDevices: () => {
      TS28BModule.getAllConnectedDevices();
    },
    measure: (mac) => {
      TS28BModule.measure(mac);
    },

    disconnect: (mac) => {
      TS28BModule.disconnect(mac);
    }

  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(TS28BModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == TS28BProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'TS28B');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
