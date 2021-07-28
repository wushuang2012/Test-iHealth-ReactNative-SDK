import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  BG1Module,
  BG1ProfileModule
} from '@ihealth/ihealthlibrary-react-native';
import { setResponse } from '../reducers/TestStore';

const TAG = 'bg1 API';
const QRCode = "02554064554014322D1200A05542D3BACE1446CE9A96190122EFEE4D1864";

export default {

  apis: {

    getAllConnectedDevices: () => {
      setResponse("Don't support the function");
    },

    getBottleInfoFromQR: () => {
      BG1Module.getBottleInfoFromQR(QRCode);
    },

    sendCode: () => {
      BG1Module.sendCode(QRCode, 1, 1);
    }
  },

  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(BG1Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
