import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP3LModule,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bg3l API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BP3LModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP3LModule.disconnect(mac);
    },

    getBattery: (mac) => {
      BP3LModule.getBattery(mac);
    },

    startMeasure: (mac) => {
      BP3LModule.startMeasure(mac);
    },

    stopMeasure: (mac) => {
      BP3LModule.stopMeasure(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP3LModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BP3L');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
