import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP5SModule,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bp5s API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BP5SModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP5SModule.disconnect(mac);
    },

    getFunctionInfo: (mac) => {
      BP5SModule.getFunctionInfo(mac);
    },

    getBattery: (mac) => {
      BP5SModule.getBattery(mac);
    },

    startMeasure: (mac) => {
      BP5SModule.startMeasure(mac);
    },

    stopMeasure: (mac) => {
      BP5SModule.stopMeasure(mac);
    },

    getOffLineNum: (mac) => {
      BP5SModule.getOffLineNum(mac);
    },

    getOffLineData: (mac) => {
      BP5SModule.getOffLineData(mac);
    },

    deleteData: (mac) => {
      BP5SModule.deleteData(mac);
    },

    enbleOffline: (mac) => {
      BP5SModule.enbleOffline(mac, 1);
    },

    disableOffline: (mac) => {
      BP5SModule.enbleOffline(mac, 0);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP5SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BP5S');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
