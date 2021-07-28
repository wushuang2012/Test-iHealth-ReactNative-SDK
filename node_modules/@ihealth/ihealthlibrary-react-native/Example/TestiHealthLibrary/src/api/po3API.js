import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  PO3Module,
  POProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'po3 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      PO3Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      PO3Module.disconnect(mac);
    },

    getBattery: (mac) => {
      PO3Module.getBattery(mac);
    },

    startMeasure: (mac) => {
      PO3Module.startMeasure(mac);
    },

    getHistoryData: (mac) => {
      PO3Module.getHistoryData(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(PO3Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == POProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'PO3');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
