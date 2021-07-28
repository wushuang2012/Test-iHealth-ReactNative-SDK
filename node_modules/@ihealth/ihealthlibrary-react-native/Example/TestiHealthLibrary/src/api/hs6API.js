import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  HS6Module,
  HS6ProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'hs6 API';

export default {

  apis: {
    init: () => {
      HS6Module.init("feng@a.com");
    },

    setWifi: () => {
      HS6Module.setWifi("ASUS 2.4", "1234567890");
    },

    bindDeviceHS6: () => {
      HS6Module.bindDeviceHS6("1979-02-26 12:20:10", 85.0, 180, 2, 1, "ACCF2337A952");
    },

    unBindDeviceHS6: () => {
      HS6Module.unBindDeviceHS6("ACCF2337A952");
    },

    getToken: () => {
      HS6Module.getToken("2a8387e3f4e94407a3a767a72dfd52ea", "fd5e845c47944a818bc511fb7edb0a77", "feng@a.com", "random_str");
    },

    setUnit: () => {
      HS6Module.setUnit("feng@a.com", 0);
    },

    getCloudData: () => {
      HS6Module.getCloudData("2a8387e3f4e94407a3a767a72dfd52ea", "fd5e845c47944a818bc511fb7edb0a77", "feng@a.com", 0, 10);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(HS6Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == HS6ProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'HS6');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
