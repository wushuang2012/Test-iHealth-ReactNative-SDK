import { DeviceEventEmitter, Alert } from 'react-native';
import {
  iHealthDeviceManagerModule,
  AM4Module,
  AMProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'am API';

export default {

  apis: {

    getAllConnectedDevices: () => {
      AM4Module.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      AM4Module.disconnect(mac);
    },

    getDevicesIDPS: (mac) => {
      iHealthDeviceManagerModule.getDevicesIDPS(mac, (event) => {
        setResponse(JSON.stringify(event));
      })
    },

    reset: (mac) => {
      AM4Module.reset(mac);
    },

    getUserId: (mac) => {
      AM4Module.getUserId(mac);
    },

    getAlarmClockNum: (mac) => {
      AM4Module.getAlarmClockNum(mac);
    },

    getAlarmClockDetail: (mac) => {
      AM4Module.getAlarmClockDetail(mac, [1, 3, 2]);
    },

    setAlarmClock: (mac) => {
      AM4Module.setAlarmClock(mac, 1, 12, 0, true, [1, 1, 1, 1, 1, 0, 0], false);
    },

    deleteAlarmClock: (mac) => {
      AM4Module.deleteAlarmClock(mac, 1);
    },

    getActivityRemind: (mac) => {
      AM4Module.getActivityRemind(mac);
    },

    setActivityRemind: (mac) => {
      AM4Module.setActivityRemind(mac, 0, 30, false);
    },

    queryAMState: (mac) => {
      AM4Module.queryAMState(mac);
    },

    setUserId: (mac) => {
      AM4Module.setUserId(mac, 8);
    },

    getUserInfo: (mac) => {
      AM4Module.getUserInfo(mac);
    },

    setUserBmr: (mac) => {
      AM4Module.setUserBmr(mac, 2000);
    },

    syncActivityData: (mac) => {
      AM4Module.syncActivityData(mac);
    },

    syncSleepData: (mac) => {
      AM4Module.syncSleepData(mac);
    },

    syncRealData: (mac) => {
      AM4Module.syncRealData(mac);
    },

    syncRealTime: (mac) => {
      AM4Module.syncRealTime(mac);
    },

    setHourMode: (mac) => {
      AM4Module.setHourMode(mac, AMProfileModule.AM_SET_24_HOUR_MODE);
    },

    getHourMode: (mac) => {
      AM4Module.getHourMode(mac)
    },

    setUserInfo: (mac) => {
      AM4Module.setUserInfo(mac, 25, 183, 80, AMProfileModule.AM_SET_MALE, AMProfileModule.AM_SET_UNIT_METRIC, 10000, 1, 30);
    },

    syncStageReportData: (mac) => {
      AM4Module.syncStageReportData(mac);
    },

    sendRandom: (mac) => {
      AM4Module.sendRandom(mac);
    },

    checkSwimPara: (mac) => {
      AM4Module.checkSwimPara(mac);
    },

    checkSwimPara: (mac) => {
      AM4Module.checkSwimPara(mac);
    },

    setSwimPara: (mac) => {
      AM4Module.setSwimPara(mac, true, 25, 0, 10, 0);
    },
  },
  notifyListener: null,
  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(AM4Module.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == AMProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'AM4');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
