import React from 'react';
import { View, Text, Platform,  TouchableOpacity, TouchableHighlight } from 'react-native';
import { Layout } from '../styles/index';

class CustomButton extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const Component = Platform.OS === 'ios' ? TouchableOpacity: TouchableHighlight;

    const {
        buttonStyle,
        textStyle,
        onPress,
        title,
    } = this.props;

    return (
      <View style={[ Layout.center ]}>
        <Component style={[ buttonStyle, Layout.center ]} onPress={ onPress }>
          <Text style={[ textStyle ]}> {title} </Text>
        </Component>
      </View>
    )
  }

}

module.exports = CustomButton;
