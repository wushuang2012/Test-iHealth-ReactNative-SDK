import { DeviceEventEmitter, Alert } from 'react-native';
import {
    iHealthDeviceManagerModule,
    AM3SModule,
    AMProfileModule
} from '@ihealth/ihealthlibrary-react-native';

import { setResponse } from '../reducers/TestStore';
import { checkConnectedDevice } from '../reducers/FindStore';

const TAG = 'am3s API';

export default {

  apis: {
    getAllConnectedDevices: () => {
      AM3SModule.getAllConnectedDevices();
    },

    disconnect: (mac) => {
      AM3SModule.disconnect(mac);
    },

    getDevicesIDPS: (mac) => {
      iHealthDeviceManagerModule.getDevicesIDPS(mac, (event) => {
        setResponse(JSON.stringify(event));
      })
    },

    reset: (mac) => {
      AM3SModule.reset(mac);
    },

    getUserId: (mac) => {
      AM3SModule.getUserId(mac);
    },

    getAlarmClockNum: (mac) => {
      AM3SModule.getAlarmClockNum(mac);
    },

    getAlarmClockDetail: (mac) => {
      AM3SModule.getAlarmClockDetail(mac, [1, 3, 2]);
    },

    setAlarmClock: (mac) => {
      AM3SModule.setAlarmClock(mac, 1, 12, 0, true, [1, 1, 1, 1, 1, 0, 0], false);
    },

    deleteAlarmClock: (mac) => {
      AM3SModule.deleteAlarmClock(mac, 1);
    },

    getActivityRemind: (mac) => {
      AM3SModule.getActivityRemind(mac);
    },

    setActivityRemind: (mac) => {
      AM3SModule.setActivityRemind(mac, 0, 30, false);
    },

    queryAMState: (mac) => {
      AM3SModule.queryAMState(mac);
    },

    setUserId: (mac) => {
      AM3SModule.setUserId(mac, 8);
    },

    getUserInfo: (mac) => {
      AM3SModule.getUserInfo(mac);
    },

    setUserBmr: (mac) => {
      AM3SModule.setUserBmr(mac, 2000);
    },

    syncActivityData: (mac) => {
      AM3SModule.syncActivityData(mac);
    },

    syncSleepData: (mac) => {
      AM3SModule.syncSleepData(mac);
    },

    syncRealData: (mac) => {
      AM3SModule.syncRealData(mac);
    },

    syncRealTime: (mac) => {
      AM3SModule.syncRealTime(mac);
    },

    setHourMode: (mac) => {
      AM3SModule.setHourMode(mac, AMProfileModule.AM_SET_24_HOUR_MODE);
    },

    getHourMode: (mac) => {
      AM3SModule.getHourMode(mac)
    },

    setUserInfo: (mac) => {
      AM3SModule.setUserInfo(mac, 25, 183, 80, AMProfileModule.AM_SET_MALE, AMProfileModule.AM_SET_UNIT_METRIC, 10000, 1, 30);
    },

    syncStageReportData: (mac) => {
      AM3SModule.syncStageReportData(mac);
    },

    sendRandom: (mac) => {
      AM3SModule.sendRandom(mac);
    },

    getPicture: (mac) => {
      AM3SModule.getPicture(mac);
    },

    setPicture: (mac) => {
      AM3SModule.setPicture(mac, 1);
    }
  },

  notifyListener: null,

  addEventListener: () => {
    notifyListener = DeviceEventEmitter.addListener(AM3SModule.Event_Notify,  (event) => {
      console.log(event);
      setResponse(JSON.stringify(event));
      if (event.action == AMProfileModule.ACTION_GET_ALL_CONNECTED_DEVICES) {
        checkConnectedDevice(event.devices, 'AM3S');
      }
    });
  },

  removeEventListener: () => {
    if(notifyListener) notifyListener.remove();
  }
}
