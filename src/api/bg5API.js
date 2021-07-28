import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BG5Module,
  BGProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'bg5 API';

const QRCode = "02554064554014322D1200A05542D3BACE1446CE9A96190122EFEE4D1864";
const BottleID = "4294967295";

export default {

  apis: {
    getAllConnectedDevices: () => {
      BG5Module.getAllConnectedDevices();
    },

    disConnect: (mac) => {
      BG5Module.disConnect(mac);
    },

    getBottleInfoFromQR: () => {
      BG5Module.getBottleInfoFromQR(QRCode);
    },

    holdLink: (mac) => {
      BG5Module.holdLink(mac);
    },

    getBattery: (mac) => {
      BG5Module.getBattery(mac);
    },

    setTime: (mac) => {
      BG5Module.setTime(mac);
    },

    setUnit: (mac) => {
      BG5Module.setUnit(mac, 1);
    },

    startMeasure: (mac) => {
      BG5Module.startMeasure(mac, 1);
    },

    getOfflineData: (mac) => {
      BG5Module.getOfflineData(mac);
    },

    deleteOfflineData: (mac) => {
      BG5Module.deleteOfflineData(mac);
    },

    setBottleMessage: (mac) => {
      BG5Module.setBottleMessage(mac, 1, 1, QRCode, 25, "2027-07-15");
    },

    getBottleMessage: (mac) => {
      BG5Module.getBottleMessage(mac);
    },

    setBottleID: (mac) => {
      BG5Module.setBottleID(mac, BottleID);
    },

    getBottleID: (mac) => {
      BG5Module.getBottleID(mac);
    }
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BG5Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == BGProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'BG5');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
