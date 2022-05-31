import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP7Module,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bp7 API';

export default {
  apis: {
    getBattery: (mac) => {
      BP7Module.getBattery(mac);
    },

    startMeasure: (mac) => {
      BP7Module.startMeasure(mac);
    },

    stopMeasure: (mac) => {
      BP7Module.stopMeasure(mac);
    },

    enbleOffline: (mac) => {
      BP7Module.enbleOffline(mac);
    },
    disableOffline: (mac) => {
      BP7Module.disableOffline(mac);
    },

    getOfflineNum: (mac) => {
      BP7Module.getOfflineNum(mac);
    },

    getOfflineData: (mac) => {
      BP7Module.getOfflineData(mac);
    },

    conformAngle: (mac) => {
      BP7Module.conformAngle(mac);
    },

    getAllConnectedDevices: () => {
      BP7Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP7Module.disconnect(mac);
    },
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP7Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BP7');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
