import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  HS4SModule,
  HSProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'hs4s API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      HS4SModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      HS4SModule.disconnect(mac);
    },

    measureOnline: (mac) => {
      HS4SModule.measureOnline(mac, 1, 123);
    },

    getOfflineData: (mac) => {
      HS4SModule.getOfflineData(mac);
    }
  },

  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(HS4SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == HSProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'HS4S');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
