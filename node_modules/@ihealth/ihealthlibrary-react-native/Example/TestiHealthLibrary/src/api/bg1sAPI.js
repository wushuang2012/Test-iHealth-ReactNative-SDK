import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BG1SModule,
  BG1SProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'BG1S API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BG1SModule.getAllConnectedDevices();
    },
    getFunction: (mac) => {
      BG1SModule.getFunction(mac);
    },
    measure: (mac, measureMode) => {
      BG1SModule.measure(mac,0);
    },

    disconnect: (mac) => {
      BG1SModule.disconnect(mac);
    }

  },
  
  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BG1SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BG1SProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BG1S');
      }
    });
  },

  removeEventListener: () => {
      if(notifyListener) notifyListener.remove();
  }
}
