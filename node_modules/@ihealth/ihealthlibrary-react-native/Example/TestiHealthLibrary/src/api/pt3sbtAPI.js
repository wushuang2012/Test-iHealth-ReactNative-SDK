import { DeviceEventEmitter } from 'react-native';
import {
  iHealthDeviceManagerModule,
  PT3SBTModule,
  PT3SBTProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'PT3SBT API';

export default {

  apis: {

    getAllConnectedDevices: () => {
        PT3SBTModule.getAllConnectedDevices();
    },
    
    setTime: (mac) => {
        PT3SBTModule.setTime(mac);
    },
    
    getBattery: (mac) => {
        PT3SBTModule.getBattery(mac);
    },

    setUnit: (mac) => {
        PT3SBTModule.setUnit(mac, 2);
    },

    getUnit: (mac) => {
        PT3SBTModule.getUnit(mac);
    },

    getHistoryCount: (mac) => {
        PT3SBTModule.getHistoryCount(mac);
    },

    getHistoryData: (mac) => {
        PT3SBTModule.getHistoryData(mac);
    },

    deleteHistory: (mac) => {
        PT3SBTModule.deleteHistory(mac);
    },

    disconnect: (mac) => {
        PT3SBTModule.disconnect(mac);
    }

  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(PT3SBTModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == PT3SBTProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'PT3SBT');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
