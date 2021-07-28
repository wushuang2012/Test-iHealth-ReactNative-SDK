import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP5Module,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bp5 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BP5Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP5Module.disconnect(mac);
    },

    getBattery: (mac) => {
      BP5Module.getBattery(mac);
    },

    startMeasure: (mac) => {
      BP5Module.startMeasure(mac);
    },

    stopMeasure: (mac) => {
      BP5Module.stopMeasure(mac);
    },

    enbleOffline: (mac) => {
      BP5Module.enbleOffline(mac);
    },

    disableOffline: (mac) => {
      BP5Module.disableOffline(mac);
    },

    isEnableOffline: (mac) => {
      BP5Module.isEnableOffline(mac);
    },

    getOfflineNum: (mac) => {
      BP5Module.getOfflineNum(mac);
    },

    getOfflineData: (mac) => {
      BP5Module.getOfflineData(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP5Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BP5');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
