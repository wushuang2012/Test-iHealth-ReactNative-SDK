import { DeviceEventEmitter, Platform } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BG5SModule,
  BG5SProfileModule
} from '@ihealth/ihealthlibrary-react-native';


import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bg5s API';
let offlineData = "";

export default {
  apis: {
    getAllConnectedDevices: () => {
      BG5SModule.getAllConnectedDevices();
    },

    disConnect: (mac) => {
      BG5SModule.disConnect(mac);
    },

    getStatusInfo: (mac) =>  {
      BG5SModule.getStatusInfo(mac);
    },

    setTime: (mac) => {
      BG5SModule.setTime(mac, '2019-04-22 9:30:30', 8);
    },

    setUnit: (mac) => {
      BG5SModule.setUnit(mac, 1);
    },

    deleteUsedStrip: (mac) => {
      BG5SModule.deleteUsedStrip(mac);
    },

    deleteOfflineData: (mac) => {
      BG5SModule.deleteOfflineData(mac);
    },

    getOfflineData: (mac) => {
      BG5SModule.getOfflineData(mac);
    },

    startMeasure: (mac) => {
      BG5SModule.startMeasure(mac, 1);
    },

    adjustOfflineData: (mac) => {
      if (Platform.OS === 'ios'){
        BG5SModule.adjustOfflineData(mac, '2019-04-22 9:30:30', []);
      } else {
        console.log(offlineData);
        BG5SModule.adjustOfflineData(mac, '2019-04-22 9:30:30', offlineData);
      }
    }
  },
  notifyListener: null,
  addEventListener: () => {
    this.notifyListener = DeviceEventEmitter.addListener(BG5SModule.Event_Notify,  (event) => {
      console.log(JSON.stringify(event));
      setResponse(JSON.stringify(event));
      offlineData = JSON.stringify(event)
      if (event.action == BG5SProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BG5S');
      };
    });
  },

  removeEventListener: () => {
    if (this.notifyListener) notifyListener.remove();
  }
}
