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
  Alert,
} from 'react-native';

global.Buffer = global.Buffer || require('buffer').Buffer;

var net = require('net');

export default class SocketIO extends Component {
  constructor(props) {
    super(props);
    this.timeoutCount = 0;
    this.netState = 0;
  }
  
  componentDidMount() {
    this.connectServer();
  }
  sendHello(){
    if (this.netState == 1){
      this.client && this.client.write('hello 哈哈');
    }
  }
  isConnected(){//回调，说明链接成功
    console.log('is connect');
    this.netState = 1;
    this.sendHello();
  }
  isClosed(close){
    console.log('close', close);//返回true 说明服务器没有开启，false说明服务器中途关闭了
    this.netState = 0;
    if (close == false){//中途服务器出问题而关闭
      Alert.alert(
        'Alert',
        '网络错误，请稍后再试！',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
    }
  }
  connectServer(){
    this.client = net.createConnection({host:'192.168.1.111', port:8888});
    this.client.on('error', function(error){
      console.log('error:', error);
    });
    this.client.on('data', function(data){
      // console.log('message was received:', data.toString());
    });
    this.client.on('close', this.isClosed.bind(this));
    this.client.on('connect', this.isConnected.bind(this));

    this.client.setTimeout(3000, ()=>{
      this.timeoutCount++;
      if (this.timeoutCount >= 3){
        this.netState = 0;
        this.client = null;
        this.timeoutCount = 0;
        Alert.alert(
          'Alert',
          '网络错误，请稍后再试！',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
      }else{
        this.connectServer();
      }
    });
  }
  componentWillUnmount() {
    this.client && this.client.destroy();
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.sendHello.bind(this)}>
          发送问好
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

