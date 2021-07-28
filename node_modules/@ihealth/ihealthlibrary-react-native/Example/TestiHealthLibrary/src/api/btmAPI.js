import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BTMModule,
  BTMProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = '550bt API';

export default {

  apis: {

    getAllConnectedDevices: () => {
      BTMModule.getAllConnectedDevices();
    },

    getMemoryData: (mac) => {
      BTMModule.getMemoryData(mac);
    },

    getBattery: (mac) => {
      BTMModule.getBattery(mac);
    },

    setStandbyTime: (mac) => {
      BTMModule.setStandbyTime(mac, 8, 10, 20);
    },

    setTemperatureUnit: (mac) => {
      BTMModule.setTemperatureUnit(mac, 1);
    },

    setMeasuringTarget: (mac) => {
      BTMModule.setMeasuringTarget(mac, 1);
    },

    setOfflineTarget: (mac) => {
      BTMModule.setOfflineTarget(mac, 1);
    },

    disconnect: (mac) => {
      BTMModule.disconnect(mac);
    }

  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BTMModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BTMProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'TS28B');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
