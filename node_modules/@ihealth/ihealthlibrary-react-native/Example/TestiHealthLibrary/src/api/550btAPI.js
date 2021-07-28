import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BP550BTModule,
  BPProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = '550bt API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      BP550BTModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      BP550BTModule.disconnect(mac);
    },

    getFunctionInfo: (mac) => {
      BP550BTModule.getFunctionInfo(mac);
    },

    getOffLineNum: (mac) => {
      BP550BTModule.getOffLineNum(mac);
    },

    getOffLineData: (mac) => {
      BP550BTModule.getOffLineData(mac);
    },

    getBattery: (mac) => {
      BP550BTModule.getBattery(mac);
    }
  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BP550BTModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BPProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BT550');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
