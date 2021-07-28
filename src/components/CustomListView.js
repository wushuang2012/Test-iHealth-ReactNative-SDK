import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Layout, Colors, TextSizes } from '../styles'

class CustomListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  renderHeader = () => {
    const { headerTitle } = this.props;
    return (
      <View style={[ Layout.center, { marginTop: 5 }]}>
        <Text style={[ TextSizes.medium ]}>{headerTitle}</Text>
      </View>
    )
  }

  renderFooter = () => {
    const { footerTitle } = this.props;
    return (
      <View style={[ Layout.center, { marginVertical: 5, marginBottom: 50 }]}>
        <Text style={[ TextSizes.medium ]}>{footerTitle}</Text>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: Colors.LightBlue[300]
        }}
      />
    );
  };

  handleRefresh = () => {
    console.log('handleRefresh');
  }

  handleLoadMore = () => {
    console.log('handleLoadMore');
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.props.renderItem}
        keyExtractor={this.props.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={false}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    )
  }
}

export default CustomListView;
