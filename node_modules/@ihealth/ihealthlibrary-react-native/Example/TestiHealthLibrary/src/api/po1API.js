import { DeviceEventEmitter } from 'react-native';
import {
  iHealthDeviceManagerModule,
  PO1Module,
  PO1ProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'po1 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
        PO1Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
        PO1Module.disconnect(mac);
    },

    getBattery: (mac) => {
        PO1Module.getBattery(mac);
    },
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(PO1Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == PO1ProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'PO3');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
