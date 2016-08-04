import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class NavBar extends Component {

  render() {
    return (
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>
          Navigation Bar
        </Text>
      </View>
    );
  }
}

//css
const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'skyblue',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '300'
  }
});
