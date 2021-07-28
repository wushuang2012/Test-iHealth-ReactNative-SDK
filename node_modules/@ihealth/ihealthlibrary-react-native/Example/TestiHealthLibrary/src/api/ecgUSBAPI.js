import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  ECGUSBModule,
  ECGProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'ecg3 API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      ECGUSBModule.getAllConnectedDevices();
    },

    getIdps: () => {
      ECGUSBModule.getIdps();
    },

    syncData: () => {
      ECGUSBModule.syncData();
    },

    deleteData: () => {
      ECGUSBModule.deleteData();
    },

    spliceData: () => {
      ECGUSBModule.spliceData(["ECGSDK_20160420025256",
                               "ECGSDK_20160420025453",
                               "ECGSDK_20160420030824",
                               "ECGSDK_20160420082435"])
    },

    getCache: () => {
      ECGUSBModule.getCache();
    },

    deleteCacheData: () => {
      ECGUSBModule.deleteCacheData();
    },

    getFilterDataByFileName: () => {
      ECGUSBModule.getFilterDataByFileName("ECG_Total_Data_20160420025256.dat","ECG_Total_Mark_20160420025256.txt");
    }

  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(ECGUSBModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == ECGProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'ECG3USB');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
