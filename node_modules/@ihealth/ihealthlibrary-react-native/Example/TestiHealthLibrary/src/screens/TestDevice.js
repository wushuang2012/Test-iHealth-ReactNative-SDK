import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Layout, TextSizes, Colors } from '../styles/index';
import CustomListView from '../components/CustomListView';
import deviceAPIs from '../api/getAPIs';

import { testAPI } from '../reducers/TestStore';

let mDeviceListener = null

class TestDevice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectDevice } = this.props;
    console.log(selectDevice);
    mDeviceListener = deviceAPIs.getDeviceAPI(selectDevice);
    if (!mDeviceListener) mDeviceListener.addEventListener();
  }

  componentWillUnmount() {
    if (mDeviceListener) mDeviceListener.removeEventListener();
    mDeviceListener = null;
  }

  getAPIName = (obj) => {
    const apis = [];
    for(var name in obj){
      const des = name;
      apis.push(des);
    }
    return apis;
  }

  render() {
    const { selectDevice, testDevice } = this.props;

    const apis = selectDevice ? this.getAPIName(deviceAPIs.getDeviceAPI(selectDevice).apis): [];

    return (
      <View>
        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30 } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{`Step 6 Test ${selectDevice} ${testDevice}`}</Text>
        </View>
        <ScrollView style={{ height: 50, marginLeft: 10, marginTop: 5 }}>
          <Text style={[ TextSizes.small ]}>{ this.props.response }</Text>
        </ScrollView>
        <CustomListView
          data={ apis }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={ () => { this.props.testAPI(item, testDevice, selectDevice) } }
              style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
              <Text style={[ TextSizes.medium ]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          headerTitle={''}
          footerTitle={''}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectDevice: state.selectStore.selectDevice,
    testDevice: state.findStore.testDevice,
    response: state.testStore.response,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAPI: (apiname, mac, type) => {
      const api = deviceAPIs.getDeviceAPI(type).apis;
      dispatch(testAPI(api, apiname, mac))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDevice);
