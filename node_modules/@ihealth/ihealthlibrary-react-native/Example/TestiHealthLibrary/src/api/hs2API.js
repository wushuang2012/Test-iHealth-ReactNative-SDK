import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  HS2Module,
  HSProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'hs2 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      HS2Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      HS2Module.disconnect(mac);
    },

    // getDeviceIDPS: (mac) => {
    //   HS2Module.getDeviceIDPS(mac);
    // },

    getBattery: (mac) => {
      HS2Module.getBattery(mac);
    },

    measureOnline: (mac) => {
      HS2Module.measureOnline(mac, 1, 123);
    },

    getOfflineData: (mac) => {
      HS2Module.getOfflineData(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(HS2Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == HSProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'HS2');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
