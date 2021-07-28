import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  HS2SModule,
  HS2SProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'hs2s API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      HS2SModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      HS2SModule.disconnect(mac);
    },

    getDeviceInfo: (mac) => {
      HS2SModule.getDeviceInfo(mac);
    },

    getBattery: (mac) => {
      HS2SModule.getBattery(mac);
    },
    
    setUnit: (mac) => {
      HS2SModule.setUnit(mac, 1);
    },

    getUserInfo: (mac) => {
      HS2SModule.getUserInfo(mac);
    },
    
    updateUserInfo: (mac) => {
      HS2SModule.updateUserInfo(mac, "1111111111111111", 1572317401, 71, 20, 180, 0, 1, 1);
    },
    
    deleteUser: (mac) => {
      HS2SModule.deleteUser(mac, "1111111111111111");
    },
    
    getMemoryDataCount: (mac) => {
      HS2SModule.getMemoryDataCount(mac, "1111111111111111");
    },
    
    getMemoryData: (mac) => {
      HS2SModule.getMemoryData(mac, "1111111111111111");
    },
    
    deleteMemoryData: (mac) => {
      HS2SModule.deleteMemoryData(mac, "1111111111111111");
    },
    
    getAnonymousMemoryDataCount: (mac) => {
      HS2SModule.getAnonymousMemoryDataCount(mac);
    },

    getAnonymousMemoryData: (mac) => {
      HS2SModule.getAnonymousMemoryData(mac);
    },

    deleteAnonymousMemoryData: (mac) => {
      HS2SModule.deleteAnonymousMemoryData(mac);
    },

    measure: (mac) => {
      HS2SModule.measure(mac, 1, "1111111111111111", 1572317401, 71, 20, 180, 0, 1, 1);
    },

    setDeviceLightUp: (mac) => {
      HS2SModule.setDeviceLightUp(mac);
    },

    enterHS2SHeartRateMeasurementMode: (mac) => {
      HS2SModule.enterHS2SHeartRateMeasurementMode(mac);
    },

    exitHS2SHeartRateMeasurementMode: (mac) => {
      HS2SModule.exitHS2SHeartRateMeasurementMode(mac);
    },

    resetDevice: (mac) => {
      HS2SModule.resetDevice(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(HS2SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == HS2SProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'HS2S');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
