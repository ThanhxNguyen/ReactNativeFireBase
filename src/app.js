/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS
} from 'react-native';
import Firebase from 'firebase';
// import { Config } from './src/config/FirebaseConfig';
import ListItem from './components/ListItem';
import NavBar from './components/NavBar';
import AddButton from './components/AddButton';

//can't put on separate file! don't know why
const config = {
    apiKey: "AIzaSyD_eMS7UEHGpZuw8mb5uHF7a62CAXhFnIg",
    authDomain: "simpletask-b1e67.firebaseapp.com",
    databaseURL: "https://simpletask-b1e67.firebaseio.com",
    storageBucket: "simpletask-b1e67.appspot.com",
};

//entry Component
class ReactNativeApp extends Component {

  constructor(props) {
    super(props);
    //firebase
    const FB = Firebase.initializeApp(config);
    this.fbRef = FB.database().ref('tasks');
    // this.fbRef.child('tasks').push({
    //   taskName: 'task what'
    // });

    this._renderRow = this._renderRow.bind(this);
    this._addTask = this._addTask.bind(this);
    // const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    //create intial state
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar/>
        <ListView
          style={styles.listView}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
          <AddButton onPress={this._addTask}/>
      </View>
    );
  }

  componentDidMount() {
    this.onChangeItemListener(this.fbRef);
  }

  _renderRow(item) {
    console.log(item);
    const taskName = item.taskName;
    const _key = item._key;

    const onPressItem = () => {
      AlertIOS.prompt(
        '"' + taskName + '"' + ' complete?',
        null,
        [
          //cancel button
          {text: 'Cancel', style: 'cancel'},
          //Done button
          {
            text: 'Done',
            onPress: () => {
              //remove this task from firebase
              this.fbRef.child(_key).remove();
            }
          }
        ],
        'default'

      );//end AlertIOS
    };

    return (
      <ListItem
        data={item}
        onPress={onPressItem} />
    );
  }

  _addTask() {
    AlertIOS.prompt(
      'Add new task',
      null,
      [
        //cancel button
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            console.log('cancel');
          }
        },
        //add button
        {
          text: 'Add',
          onPress: this.pushDataToFB.bind(this)
        }
      ]
    );
  }//end _addTask

  pushDataToFB(value) {
    if(value.length > 0) {
      this.fbRef.push({taskName: value});
    } else {
      AlertIOS.alert(
        'Error',
        'Please enter a valid task name!',
        [
          {text: 'OK'}
        ]
      );
    }
  }

  onChangeItemListener(fbRef) {
    fbRef.on('value', (snapshot) => {
      //will store the return value from firebase into this rows[]
      let rows = [];
      snapshot.forEach((item) => {
        rows.push({
          taskName: item.val().taskName,
          _key: item.key
        });
      });//end forEach


      //update the state
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rows)
      });

    });//end event

  }

}//end class

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    flex: 10,
  }
});

AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
