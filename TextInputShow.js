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
  Image,
  TextInput,
  DeviceEventEmitter,
  Keyboard,
} from 'react-native';

let Dimensions = require('Dimensions');
let totalHeight = Dimensions.get('window').height;


// TextInput与Text组件类似，TextInput组件内部的元素不再使用flexbox布局，而是采用文本布局
// 不要将TextInput组件视为一个支持flexbox样式的盒子模型，
// 不要按照盒子模型对其设置flexbox键值
// 
// android平台，指定上下padding为0，height大于fontSize的1.1倍
// ios平台，无论指不指定上下padding为0，height大于fontSize的1.1倍

var AutoExpandingTextInput = React.createClass({
  getInitialState:function(){
    return {text: '', height:0};
  },
  _onChange:function(event){
    this.setState({
      text: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height,
    });
  },
  render: function(){
    return (
      <TextInput {...this.props}
          multiline = {true}
          onChange={this._onChange}
          style={[styles.textInputStyle1, {height:Math.max(35, this.state.height)}]}
          value={this.state.text}/>
    );
  }
});

export default class TextInputShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      KeyboardShown: false,
    };
  }
  keyboardDidShowListener(event){
    this.setState({KeyboardShown:true});
  }
  keyboardDidHideListener(event){
    this.setState({KeyboardShown:false});
  }
  componentWillMount(){
    this.show = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShowListener.bind(this));
    this.hide = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHideListener.bind(this));
  }
  componentWillUnmount(){
    this.show.remove();
    this.hide.remove();
  }
  onDismissKeyboard(){
    let dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();
  }
  _onChangeText(newText){
    console.log('input text:' + newText);
  }
  render() {
    return (
      <View style={[styles.container, this.state.KeyboardShown && styles.bumpedContainer]}>
        <Text style={styles.buttonStyle} onPress={this.onDismissKeyboard.bind(this)}>
          Dismiss keyboard
        </Text>
        <View style={{borderWidth:1}}>
          <TextInput style={styles.textInputStyle}
            onFocus={()=>this.setState({bumpedUp:1})}
            onEndEditing={()=>this.setState({bumpedUp:0})}
            defaultValue = 'Ajfg你好'
            underlineColorAndroid = 'white'/>
        </View>

        <AutoExpandingTextInput style={styles.textInputStyle1}
            onChangeText={this._onChangeText.bind(this)}
            defaultValue = '高度自动增加的输入框'/>

        <Text style={{marginTop:10,backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bumpedContainer:{
    marginTop:-210,
    marginBottom:210,
  },
  buttonStyle:{
    top:250,
    fontSize:30,
    backgroundColor:'grey',
  },
  textInputStyle:{
    position:'absolute',
    top:totalHeight-80,
    left:20,
    width:200,
    height:30,
    fontSize:20,
    backgroundColor:'grey',
  },
  textInputStyle1:{
    fontSize:20,
    width:300,
    height:30,
    backgroundColor:'grey',
    paddingTop:0,
    paddingBottom:0,
  },
});
