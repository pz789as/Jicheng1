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
  TouchableHighlight,
} from 'react-native';

let Dimensions = require('Dimensions');
var totalWidth = Dimensions.get('window').width;
let naviButtonWidth = totalWidth / 4;
let naviButtonHeight = naviButtonWidth * 0.75;

export default class NaviBar extends Component {
  static propsTypes = {
    naviBarStatus: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    onNaviBarPress: React.PropTypes.func.isRequired,
  };
  constructor(props){
    super(props);
    this.state={
      selectBar: 0,
    };
  }
  _naviBar0Pressed(){
    this.props.onNaviBarPress(0);
    this.setState({selectBar:0});
  }
  _naviBar1Pressed(){
    this.props.onNaviBarPress(1);
    this.setState({selectBar:1});
  }
  _naviBar2Pressed(){
    this.props.onNaviBarPress(2);
    this.setState({selectBar:2});
  }
  _naviBar3Pressed(){
    this.props.onNaviBarPress(3);
    this.setState({selectBar:3});
  }
  render() {
    var that = this;
    var buttonColors = this.props.naviBarStatus.map(function(aNumber){
      if (aNumber === that.state.selectBar) return 'white';
      return 'grey';
    });
    return (
      <View style={{flex:1}}>
        <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>

        <View style={styles.naviRow}>
          <TouchableHighlight onPress={this._naviBar0Pressed.bind(this)}>
            <View style={[styles.button, {backgroundColor:buttonColors[0]}]}>
              <Text style={styles.textStyle1}>
                栏目一
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._naviBar1Pressed.bind(this)}>
            <View style={[styles.button, {backgroundColor:buttonColors[1]}]}>
              <Text style={styles.textStyle1}>
                栏目二
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._naviBar2Pressed.bind(this)}>
            <View style={[styles.button, {backgroundColor:buttonColors[2]}]}>
              <Text style={styles.textStyle1}>
                栏目三
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._naviBar3Pressed.bind(this)}>
            <View style={[styles.button, {backgroundColor:buttonColors[3]}]}>
              <Text style={styles.textStyle1}>
                栏目四
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  naviRow: {
    flexDirection: 'row',
  },
  button: {
    width:naviButtonWidth,
    height:naviButtonHeight,
    justifyContent:'center',
  },
  textStyle1:{
    fontSize: 20,
    textAlign: 'center',
  }
});
