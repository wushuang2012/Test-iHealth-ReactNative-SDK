import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { createNavigator, SwitchRouter, createNavigationContainer, SceneView } from 'react-navigation';

import Select from '../screens/SelectDevice';
import Find from '../screens/FindDevice';
import Test from '../screens/TestDevice';

import CustomButton from '../components/CustomButton';

import { Colors, Buttons, TextSizes } from '../styles'

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bacgroundColor: Colors.LightBlue[500],
  },
  tab: {
    height: 56,
    width: width,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt: {
    padding: 20,
    fontSize: 15,
    color: Colors.white,
  }
};

function createCustomNavigator(routeConfigMap, config = {}) {
  let router = SwitchRouter(routeConfigMap, config);
  let NavigatorComponent = createNavigator(
    NavigationView,
    router,
    config,
  );
  return createNavigationContainer(NavigatorComponent);
}

class NavigationView extends React.Component {

  render() {
    let { state } = this.props.navigation;
    let activeKey = state.routes[state.index].key;
    let descriptor = this.props.descriptors[activeKey];
    let ScreenComponent = descriptor.getComponent();

    return (
      <View style={{ flex: 1 }}>
        <SceneView
          component={ScreenComponent}
          navigation={descriptor.navigation}
          screenProps={this.props.screenProps}
        />
        <View style={styles.tab}>
          {state.routes.map(({ routeName, key }) => (
          <CustomButton
            key={key}
            onPress={() => this.props.navigation.navigate(routeName)}
            buttonStyle={[ Buttons.small ]}
            textStyle={[ TextSizes.small, { color: Colors.white } ]}
            title={routeName} />
          ))}
        </View>
      </View>
    );
  }
}

export default createCustomNavigator({
  Select,
  Find,
  Test,
});

