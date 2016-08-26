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
  View
} from 'react-native';

export default class LayoutText extends Component {
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayout.bind(this)}>
        <Text style={styles.welcome} onLayout={this._onLayoutText.bind(this)}>
          屏幕翻转时调用了onLayout函数{'\r\n'}
          可以看log输出结果
        </Text>
        <Text style={{backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
  _onLayout(event){
    {
      let {x,y,width,height} = event.nativeEvent.layout;
      console.log('width from View onLayout:' + width);
      console.log('height from View onLayout:' + height);
      console.log('x from View onLayout:' + x);
      console.log('y from View onLayout:' + y);
    }

    let Dimensions = require('Dimensions');
    let {width, height} = Dimensions.get('window');
    console.log('widht from Dimensions' + width);
    console.log('height from Dimensions:' + height);
    console.log('\r\n');
  }
  _onLayoutText(event){
    let {x,y,width,height} = event.nativeEvent.layout;
      console.log('width from Text onLayout:' + width);
      console.log('height from Text onLayout:' + height);
      console.log('x from Text onLayout:' + x);
      console.log('y from Text onLayout:' + y);
      console.log('\r\n');
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
