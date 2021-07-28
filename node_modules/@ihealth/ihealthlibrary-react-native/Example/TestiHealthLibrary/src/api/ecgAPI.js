import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  ECGModule,
  ECGProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'ecg3 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      ECGModule.getAllConnectedDevices();
    },

    startMeasure: (mac) => {
      ECGModule.startMeasure(mac);
    },

    stopMeasure: (mac) => {
      ECGModule.stopMeasure(mac);
    },

    getBattery: (mac) => {
      ECGModule.getBattery(mac);
    },

    sysTime: (mac) => {
      ECGModule.sysTime(mac);
    },

  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(ECGModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == ECGProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'ECG3');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
