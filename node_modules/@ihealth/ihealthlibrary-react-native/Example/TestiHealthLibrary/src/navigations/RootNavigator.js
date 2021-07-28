import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import NavigationService from './NavigationService';
import CustomNavigator from './CustomNavigator';

import SelectDevice from '../screens/SelectDevice';
import FindDevice from '../screens/FindDevice';
import TestDevice from '../screens/TestDevice';

class RootNavigator extends React.Component {
  state = {
    initScreen: 'CustomNavigator',
  };

  render() {
    const routeConfig = {
      SelectDevice: {
        screen: SelectDevice,
      },
      FindDevice: {
        screen: FindDevice,
      },
      TestDevice: {
        screen: TestDevice,
      },
      CustomNavigator: {
        screen: CustomNavigator,
        navigationOptions: () => ({
          title: 'iHealth RNSDK Test'
        })
      }
    };

    const navigatorConfig = {
      initialRouteName: this.state.initScreen,
      gesturesEnabled: true,
      statusBarStyle: 'light-content',
    };

    const RootStackNavigator = createStackNavigator(routeConfig, navigatorConfig);
    const AppContainer = createAppContainer(RootStackNavigator);

    return (
      <AppContainer
        ref={(v) => {
          if (v) { NavigationService.setTopLevelNavigator(v); }
        }}
        uriPrefix='/'>
        <RootStackNavigator />
      </AppContainer>
    );
  }
}

export default RootNavigator;
