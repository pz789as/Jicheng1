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

export default class TransformText extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome0}>Welcome to React Native</Text>
        <Text style={styles.welcome1}>Welcome to React Native</Text>
        <Text style={styles.welcome2}>Welcome to React Native</Text>
        <Text style={styles.welcome3}>Welcome to React Native</Text>
        <Text style={styles.welcome4}>Welcome to React Native</Text>
        <Text style={styles.welcome5}>Welcome to React Native</Text>
        <Text style={styles.welcome6}>Welcome to React Native</Text>
        <Text style={styles.welcome7}>Welcome to React Native</Text>
        <Text style={styles.welcome8}>Welcome to React Native</Text>
        <Text style={styles.welcome9}>Welcome to React Native</Text>
        <Text style={styles.welcome10}>Welcome to React Native</Text>
        <Text style={{backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
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
  welcome0: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{rotate:'45deg'}],
    backgroundColor:'#00000000',
  },
  welcome1: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{rotateX:'45deg'}],
    backgroundColor:'#00000000',
  },
  welcome2: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{rotateY:'45deg'}],
    backgroundColor:'#00000000',
  },
  welcome3: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{rotateZ:'45deg'}],
    backgroundColor:'#00000000',
  },
  welcome4: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{scale:2}],
    backgroundColor:'#00000000',
  },
  welcome5: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{scaleX:2}],
    backgroundColor:'#00000000',
  },
  welcome6: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{scaleY:2}],
    backgroundColor:'#00000000',
  },
  welcome7: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{translateX:200}],
    backgroundColor:'#00000000',
  },
  welcome8: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{translateY:150}],
    backgroundColor:'#00000000',
  },
  welcome9: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{skewX:'45deg'}],
    backgroundColor:'#00000000',
  },
  welcome10: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    transform:[{skewY:'45deg'}],
    backgroundColor:'#00000000',
  },
});

