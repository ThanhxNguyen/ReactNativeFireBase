import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class ListItem extends Component {

  //component intialization steps happen here
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.listItem}>
          <Text>
            {this.props.data.taskName}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

}

//css
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'rgb(199, 247, 210)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 2
  }
});
