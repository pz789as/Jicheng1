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

export default class PointerEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      bigButtonPointerEvents:null,
    };
  }
  onBigButtonPressed(){
    console.log('Big button pressed');
  }
  onSmallButtonPressed(){
    if (this.state.bigButtonPointerEvents === null){
      console.log('big button will not responde.');
      this.setState({bigButtonPointerEvents:'none'});
      return;
    }
    console.log('big button will responde');
    this.setState({bigButtonPointerEvents:null});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sButtonStyle} 
              onPress={this.onSmallButtonPressed.bind(this)}>
          Small button
        </Text>
        <Text style={styles.bButtonStyle} 
              onPress={this.onBigButtonPressed.bind(this)}
              pointerEvents={this.state.bigButtonPointerEvents}>
          Big button
        </Text>
        <Text style={{textAlign:'center',top:150, backgroundColor:'grey',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sButtonStyle: {
    fontSize: 20,
    left:130,
    top:50,
    width:150,
    height:35,
    backgroundColor:'grey',
  },
  bButtonStyle:{
    fontSize: 20,
    left:130,
    top:130,
    width:150,
    height:70,
    backgroundColor:'grey',
  },
});
