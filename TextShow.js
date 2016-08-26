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
} from 'react-native';

var aImage = require('./res/1.jpg');

// Text中的fontSize和height的设置要点
// 在ios平台上，当height等于fontSize的1.2倍时，显示的效果最佳
// 在android平台上，1.35倍显示效果最佳

// Text组件如果需要带边框的话，ios可以直接使用borderWidth，但是这个效果在android上不行
// 所以想达到两边都适应，最后外面都包一个View组件，然后设置边框。（版本0.20，新版本还不知道）

export default class TextShow extends Component {
  render() {
    let baseStyle1 = {
      fontSize:20,textAlign:'center',color:'black',
      textShadowOffset:{width:5,height:5},
      textShadowRadius:2, textShadowColor:'grey',
    };
    let baseStyle2 = {
      fontSize:20,textAlign:'center',color:'black',
      textShadowOffset:{width:5,height:5},
      textShadowRadius:2, textShadowColor:'grey',
      padding: 5,
    };
    let baseStyle3 = {
      fontSize:20,textAlign:'center',color:'black',
      textShadowOffset:{width:5,height:5},
      textShadowRadius:2, textShadowColor:'grey',
      padding: 5,letterSpacing:5,
    };
    let baseStyle4 = {
      fontSize:20,textAlign:'center',color:'black',
      textShadowOffset:{width:5,height:5},
      textShadowRadius:2, textShadowColor:'grey',
      padding: 5,letterSpacing:5,
      lineHeight: 30,
    };
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20,textAlign:'center'}}>
          我是20号字体
          <Text style={{fontWeight:'bold'}}>
            {'\r\n'}我是加粗20号字体
            <Text style={{color:'black'}}>
              {'\r\n'}我是加粗黑色20号字体
            </Text>
          </Text>
        </Text>


        <Text style={baseStyle1}>
          我是20号字体
        </Text>


        <Text style={baseStyle2}>
          我是20号字体
        </Text>


        <Text style={baseStyle3}>
          我是20号字体
        </Text>


        <Text style={baseStyle3}>
          我是20号字体
          <Text style={{fontWeight:'bold'}}>
            {'\r\n'}我是加粗20号字体
          </Text>
        </Text>
        <Text style={baseStyle4}>
          我是20号字体
          <Text style={{fontWeight:'bold'}}>
            {'\r\n'}我是加粗20号字体
          </Text>
        </Text>

        <Text style={styles.textStyle}>
          Happy
        </Text>
        <View style={styles.viewForTextStyle}>
          <Text style={styles.textSize}>
            忧伤
          </Text>
        </View>

        <Text style={styles.welcome}>
          Welcome to <Image source={aImage} style={styles.imageInTextStyle}/> React Native
        </Text>

        <Text style={{marginTop:10,backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
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
  textSize:{
    fontSize:30,
  },
  viewForTextStyle:{
    height:50,
    width:200,
    backgroundColor:'grey',
    alignItems: 'center',
    justifyContent:'center',
    margin:5,
  },
  textStyle:{
    height:50,
    width:200,
    fontSize:30,
    backgroundColor:'grey',
    textAlign:'center',
    justifyContent:'center',
    margin:5,
  },
  welcome:{
    fontSize:20,
    textAlign:'center',
    margin:10,
  },
  imageInTextStyle:{
    width:20,
    height:20,
    resizeMode:'cover',
  },
});
