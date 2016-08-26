/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import ImageEquallyEnlarge from './ImageEquallyEnlarge';

export default class ShowImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageEquallyEnlarge style={styles.image1Style}
            source={require('./res/tab.jpg')}
            originalWidth={220}
            originalHeight={160}/>
        <ImageEquallyEnlarge style={styles.image2Style}
            source={require('./res/tab.jpg')}
            originalWidth={220}
            originalHeight={160}/>
        <ImageEquallyEnlarge style={styles.image3Style}
            source={require('./res/header-icon.png')}
            originalWidth={220}
            originalHeight={160}/>
        <Text>热更新测试用增添字符串</Text>

        <Text style={{textAlign:'center', backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5FCFF',
  },
  image1Style:{
    width: 240,
    height: 360,
    backgroundColor: 'red',
  },
  image2Style:{
    width: 300,
    height: 460,
    backgroundColor: 'red',
  },
  image3Style:{
    width: 140,
    height: 200,
    backgroundColor: 'red',
  },
});

