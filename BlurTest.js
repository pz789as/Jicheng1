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
  ScrollView,
} from 'react-native';

import {
  BlurView,
  VibrancyView,
} from 'react-native-blur';

var is = require('./res/header-icon.png');
import FXBlurView from 'react-native-fxblurview';
// var EffectsView = require('react-native-effects-view');

export default class BlurTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blurEnabled: true,
      blurRadius: 0,
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <Image source={is} style={[styles.menu, {marginTop: 10}]}>
            <BlurView blurType='dark' style={styles.blur}>
              <Text>Hi, I am a tiny menu item</Text>
            </BlurView>
          </Image>
          <Image source={is} style={[styles.menu, {marginTop: 10}]}>
            <VibrancyView blurType='xlight' style={styles.blur}>
              <Text>Hi, I am a tiny menu item</Text>
            </VibrancyView>
          </Image>
          <Image source={is} style={styles.menu}>
            <BlurView blurType='light' style={styles.blur}>
              <Text>Hi, I am a tiny menu item</Text>
            </BlurView>
          </Image>
          <FXBlurView
            blurRadius={this.state.blurRadius}
            blurEnabled={this.state.blurEnabled}
            dynamic={true}
            style={styles.fxblurStyle}>
            <Image source={is} style={[styles.menu, {marginTop: 10}]} />
          </FXBlurView>
          <Text style={{fontSize: 30, textAlign: 'center'}} onPress={this.addFxBlur.bind(this)}>
            {this.state.blurRadius}
          </Text>
          <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
        </ScrollView>
      </View>
    );

    //  <EffectsView 
    //         style={styles.effectStyle} 
    //         blurStyle="dark" 
    //         vibrantContent={this.renderVibrant.bind(this, 'dark')}>
    //         <Image source={is} style={[styles.menu, {marginTop: 10}]} />
    //       </EffectsView>
  }
  addFxBlur(){
    this.setState({
      // blurEnabled: !this.state.blurEnabled,
      blurRadius: this.state.blurRadius + 1,
    });
  }
  renderVibrant(text){
    return (
      <View>
        <Text style={styles.effectText}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  effectText:{
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  effectStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fxblurStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menu:{
    width: 200,
    height: 200,
  },
  blur:{
    width: 200,
    height: 200,
  },
});

