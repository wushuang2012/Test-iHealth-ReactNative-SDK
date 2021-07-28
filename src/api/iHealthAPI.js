import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule
} from '@ihealth/ihealthlibrary-react-native'
import { foundDevice, connectedDevice } from '../reducers/FindStore';
import { setRegister } from '../reducers/SelectStore';
const TAG = 'iHealthAPI';

export default {

  addListener: () => {

    this.authenListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Authenticate_Result, (event) => {
      console.log(TAG + JSON.stringify(event));
      if (!event.authen) return ;
      if (event.authen === 2) setRegister(true);
      else                    setRegister(false);

    });

    this.scanListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Device, (event) => {
      console.log(TAG + JSON.stringify(event));
      foundDevice(event.mac, event.type);
    });

    this.scanFinishListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Finish, (event) => {
      console.log(TAG + JSON.stringify(event));
    });

    this.connectSuccessListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, (event) => {
      console.log(TAG + JSON.stringify(event));
      connectedDevice(event.mac, event.type);
    });

    this.connectFailedListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, (event) => {
      console.log(TAG + JSON.stringify(event));
    });

    this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, (event) => {
      console.log(TAG + JSON.stringify(event));
    });
  },

  removeListener: () => {
    if (this.authenListener) {
        this.authenListener.remove()
    }
    if (this.scanListener) {
        this.scanListener.remove()
    }
    if (this.scanFinishListener) {
        this.scanFinishListener.remove()
    }
    if (this.connectSuccessListener) {
        this.connectSuccessListener.remove()
    }
    if (this.connectFailedListener) {
        this.connectFailedListener.remove()
    }
    if (this.disconnectListener) {
        this.disconnectListener.remove()
    }
  },

  authenConfigureInfo: () => {
    iHealthDeviceManagerModule.authenConfigureInfo('heds@12.com', '2a8387e3f4e94407a3a767a72dfd52ea', 'fd5e845c47944a818bc511fb7edb0a77');
  },

  sdkAuthWithLicense: (filename) => {
    iHealthDeviceManagerModule.sdkAuthWithLicense(filename);
  },

  findDevice: (type) => {
    iHealthDeviceManagerModule.startDiscovery(type);
  },

  connectDevice: (mac, type) => {
    iHealthDeviceManagerModule.connectDevice(mac, type);
  }
}
