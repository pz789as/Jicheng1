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
  Navigator,
} from 'react-native';

export default class WaitingLeaf extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textPromptStyle}>
          注册使用手机号:{this.props.phoneNumber}
        </Text>
        <Text style={styles.textPromptStyle}>
          注册使用密码:{this.props.userPW}
        </Text>
        <Text style={styles.bigTextPrompt} onPress={this.goBack.bind(this)}>
          返回
        </Text>
      </View>
    );
  }

  goBack() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F5FCFF',
  },
  textPromptStyle:{
    fontSize:20
  },
  bigTextPrompt:{
    width:300,
    backgroundColor:'gray',
    color:'white',
    textAlign:'center',
    fontSize:60,
  },
});

