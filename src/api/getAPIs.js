import am3sAPI  from './am3sAPI';
import am4API  from './am4API';
import bg1API  from './bg1API';
import bg5API  from './bg5API';
import bg5sAPI  from './bg5sAPI';
import bp3lAPI from './bp3lAPI';
import bp5API  from './bp5API';
import bp5sAPI from './bp5sAPI';
import bp7API from './bp7API';
import bp7sAPI from './bp7sAPI';
import hs2API  from './hs2API';
import hs4sAPI from './hs4sAPI';
import hs6API  from './hs6API';
import bt550API from './550btAPI';
import po3API from './po3API';
import ecg3API from './ecgAPI';
import ecg3USBAPI from './ecgUSBAPI';
import btmAPI from './btmAPI';
import nt13bAPI from './nt13bAPI';
import ts28bAPI from './ts28bAPI';
import hs2sAPI from './hs2sAPI';
import bg1sAPI  from './bg1sAPI';
import po1API from './po1API';
import pt3sbtAPI  from './pt3sbtAPI';

export default {

  getDeviceAPI: (type) => {
    switch(type) {
      case 'AM3S':
        return am3sAPI;

      case 'AM4':
        return am4API;

      case 'BG1':
        return bg1API;

      case 'BG5':
        return bg5API;

      case 'BG5S':
        return bg5sAPI;

      case 'BP3L':
        return bp3lAPI;

      case 'BP5':
        return bp5API;

      case 'BP5S':
        return bp5sAPI;

      case 'BP7':
        return bp7API;

      case 'BP7S':
        return bp7sAPI;

      case 'HS2':
        return hs2API;
        
      case 'HS4':
      case 'HS4S':
        return hs4sAPI;

      case 'HS6':
        return hs6API;

      case 'KN550':
        return bt550API;

      case 'PO3':
        return po3API;

      case 'ECG3':
        return ecg3API;

      case 'ECG3USB':
        return ecg3USBAPI;

      case 'FDIR_V3':
        return btmAPI;
            
      case 'NT13B':
        return nt13bAPI;
            
      case 'TS28B':
        return ts28bAPI;
            
     case 'HS2S':
       return hs2sAPI;
            
      case 'BG1S':
        return bg1sAPI;

      case 'PO1':
        return po1API;

      case 'PT3SBT':
        return pt3sbtAPI;
            
    }
  }
}
