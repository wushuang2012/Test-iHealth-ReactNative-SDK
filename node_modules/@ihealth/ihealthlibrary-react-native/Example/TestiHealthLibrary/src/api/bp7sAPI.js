import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP7SModule,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bp7s API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BP7SModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP7SModule.disconnect(mac);
    },

    getFunctionInfo: (mac) => {
      BP7SModule.getFunctionInfo(mac);
    },

    getOffLineNum: (mac) => {
      BP7SModule.getOffLineNum(mac);
    },

    getOffLineData: (mac) => {
      BP7SModule.getOffLineData(mac);
    },

    getBattery: (mac) => {
      BP7SModule.getBattery(mac);
    },

    setUnit: (mac) => {
      BP7SModule.setUnit(mac, 1);
    },

    angleSet: (mac) => {
      BP7SModule.angleSet(mac, 80, 30, 80, 30);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP7SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BP7S');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
