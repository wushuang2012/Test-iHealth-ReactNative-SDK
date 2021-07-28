import React from 'react';
import {
  Platform, StyleSheet, Text,
  View, Picker
} from 'react-native';

import { Provider } from 'react-redux';
import store from './config/store';

import RootNavigator from './navigations/RootNavigator';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store()}>
        <RootNavigator />
      </Provider>
    );
  }
}
