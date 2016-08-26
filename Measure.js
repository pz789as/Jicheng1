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
  TextInput,
} from 'react-native';

export default class Measure extends Component {
  componentDidMount(){
    var aref = this.tempfunc;
    window.setTimeout(aref.bind(this), 1);// 在componentDidMount 执行完后才可以获取位置
    // 因此指定一个1毫秒后超时的定时器
  }
  tempfunc(){
    this.refs.aTextInputRef.measure(this.getTextInputPosition.bind(this));//获取位置
  }
  getTextInputPosition(fx, fy, width, height, px, py){
    console.log('getTextInputPosition');
    console.log('Component width is: ' + width);
    console.log('Component height is: ' + height);
    console.log('X offset to frame: ' + fx);
    console.log('Y offset to frame: ' + fy);
    console.log('X offset to page: ' + px);
    console.log('Y offset to page: ' + py);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{borderWidth:1}}>
          <TextInput style={styles.textInputStyle}
              ref='aTextInputRef'
              defaultValue='Ajfg你好'
              underlineColorAndroid='white'/>
        </View>
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
  textInputStyle:{
    width:200,
    height:55,
    fontSize:50,
    alignItems:'center',
    justifyContent:'center',
    paddingTop:0,
    paddingBottom:0,
  },
});

