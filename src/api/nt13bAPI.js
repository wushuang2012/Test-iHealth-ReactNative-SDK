import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  NT13BModule,
  NT13BProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'NT13B API';

export default {

  apis: {

    getAllConnectedDevices: () => {
      NT13BModule.getAllConnectedDevices();
    },

    measure: (mac) => {
      NT13BModule.measure(mac);
    },

    disconnect: (mac) => {
      NT13BModule.disconnect(mac);
    }

  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(NT13BModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == NT13BProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'NT13B');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
