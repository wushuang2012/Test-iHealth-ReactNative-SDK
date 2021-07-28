import React from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import { Layout, TextSizes, Colors, Buttons } from '../styles/index';
import CustomButton from '../components/CustomButton';
import CustomListView from '../components/CustomListView';

import NavigationService from '../navigations/NavigationService';


import { searchDevice, connectDevice, testDevice, getConnected, cleanFoundDevice, cleanConnectedDevice } from '../reducers/FindStore';
import iHealthAPI from '../api/iHealthAPI';
import deviceAPIs from '../api/getAPIs';

let mDeviceListener = null;

class FindDevice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    iHealthAPI.addListener();
    const { selectDevice } = this.props;
    console.log(selectDevice);
    if (selectDevice) {
      mDeviceListener = deviceAPIs.getDeviceAPI(selectDevice);
      if (mDeviceListener) mDeviceListener.addEventListener();
      this.props.getConnected(selectDevice);
    }
  }

  componentWillUnmount() {
    this.props.cleanFoundDevice();
    this.props.cleanConnectedDevice();
    iHealthAPI.removeListener();
    if (mDeviceListener) mDeviceListener.removeEventListener();
    mDeviceListener = null;
  }

  _goTest = (mac) => {
    console.log("_goTest: " + mac);
    this.props.testDevice(mac);
    NavigationService.navigate('TestDevice', null);
  }

  render() {

    const { selectDevice, findDevices, connectedDevices } = this.props;

    return (
      <View>
        {/* <ScrollView> */}
        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30, } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{'Step 4 Find Device'}</Text>
        </View>
        <View style={[ Layout.center, { flexDirection: 'row', marginTop: 10, }]}>
          <CustomButton
            onPress={ () => { this.props.searchDevice(selectDevice) }}
            buttonStyle={[ Buttons.medium ]}
            textStyle={[ TextSizes.medium, Colors.LightBlue[500] ]}
            title={`Find ${selectDevice} Devices`} />
        </View>
        <CustomListView
          data={ findDevices }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={ () => { this.props.connectDevice(item.mac, item.type); }}
              style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
              <Text style={[ TextSizes.medium ]}>{item.mac}</Text>
              <Text style={[ TextSizes.medium ]}>{item.type}</Text>
              {/* <Icon name="right" size={30} color={Colors.LightBlue[500]} /> */}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mac}
          headerTitle={''}
          footerTitle={''}
        />

        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30, } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{'Step 5 Connected Device'}</Text>
        </View>
        <CustomListView
          data={ connectedDevices }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={ () => { this._goTest(item.mac); }}
              style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
              <Text style={[ TextSizes.medium ]}>{item.mac}</Text>
              <Text style={[ TextSizes.medium ]}>{item.type}</Text>
              {/* <Icon name="right" size={30} color={Colors.LightBlue[500]} /> */}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mac}
          headerTitle={''}
          footerTitle={''}
        />
        {/* </ScrollView> */}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectDevice: state.selectStore.selectDevice,
    findDevices: state.findStore.findDevices,
    connectedDevices: state.findStore.connectedDevices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchDevice: (type) => { dispatch(searchDevice(type)) },
    connectDevice: (mac, type) => { dispatch(connectDevice(mac, type)) },
    testDevice: (mac) => { dispatch(testDevice(mac)) },
    getConnected: (type) => { dispatch(getConnected(type)) },
    cleanFoundDevice: () => { dispatch(cleanFoundDevice()) },
    cleanConnectedDevice: () => { dispatch(cleanConnectedDevice()) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindDevice);
