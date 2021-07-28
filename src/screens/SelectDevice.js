import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Layout, Buttons, Colors, TextSizes} from '../styles/index';
import CustomButton from '../components/CustomButton';
import CustomListView from '../components/CustomListView';

import NavigationService from '../navigations/NavigationService';

import {
  setDevice,
  register,
  checkLicense,
  checkPermission,
} from '../reducers/SelectStore';

import iHealthAPI from '../api/iHealthAPI';

const DeviceTypes = [
  'AM3S', 'AM4',
  'BG1', 'BG1S', 'BG5', 'BG5S',
  'BP3L', 'BP5', 'BP5S', 'BP7', 'BP7S', 'KN550',
  'HS2', 'HS4', 'HS4S', 'HS6',
  'PO1', 'PO3',
  'ECG3', 'ECG3USB',
  'FDIR_V3','TS28B', 'NT13B', 'PT3SBT',
  'HS2S'
];

class SelectDevice extends React.Component {
  constructor(props) {
    super(props);
  }

  _goNext = (item) => {
    this.props.setDevice(item);
    if (item === 'HS6') {
      NavigationService.navigate('TestDevice', null);
    } else {
      NavigationService.navigate('FindDevice', null);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>

        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30, } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{'Step 1 Check license'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <CustomButton
            onPress={() => { this.props.checkLicense() }}
            buttonStyle={[ Buttons.medium ]}
            textStyle={[ TextSizes.medium, Colors.LightBlue[500] ]}
            title={'Check license'} />
          {/* <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <Text style={[ TextSizes.medium, Colors.LightBlue[500] ]}>{this.props.isRegister? 'Yes': 'No'}</Text>
          </View> */}
        </View>

        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30, } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{'Step 2 Check permission (Android) '}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <CustomButton
            onPress={() => { this.props.checkPermission() }}
            buttonStyle={[ Buttons.medium ]}
            textStyle={[ TextSizes.medium, Colors.LightBlue[500] ]}
            title={'Check Permission'} />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <Text style={[ TextSizes.medium, Colors.LightBlue[500] ]}>{this.props.isPermission? 'Yes': 'No'}</Text>
          </View>
        </View>

        <View style={[ Layout.center, { backgroundColor: Colors.LightBlue[500], height: 30, } ]}>
          <Text style={[ TextSizes.medium, { color: Colors.white }]}>{'Step 3 Select Device'}</Text>
        </View>
        <CustomListView
          data={ DeviceTypes }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              onPress={ () => { this._goNext(item) }}
              style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
              <Text style={[ TextSizes.medium ]}>{item}</Text>
              {/* <Icon name="right" size={30} color={Colors.LightBlue[500]} /> */}
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
    isRegister: state.selectStore.isRegister,
    isPermission: state.selectStore.isPermission
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDevice: (type) => { dispatch(setDevice(type)) },
    register: () => { dispatch(register()) },
    checkLicense: () => { dispatch(checkLicense()) },
    checkPermission: () => { dispatch(checkPermission()) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectDevice);
