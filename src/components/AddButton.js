import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class AddButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableHighlight
          style={styles.button}
          onPress={this.props.onPress}
          underlayColor='#1fa9f7'>

          <View>
            <Text style={styles.buttonText}>Add Task</Text>
          </View>

        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'skyblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
