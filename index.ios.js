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

import RegisterLeaf from './RegisterLeaf';
import WaitingLeaf from './WaitingLeaf';
import TransformText from './TransformText';
import LayoutText from './LayoutText';
import PointerEvent from './PointerEvent';
import NaviBar from './NaviBar';
import ShowImage from './ShowImage';
import TextShow from './TextShow';
import TextInputShow from './TextInputShow';
import Measure from './Measure';
import AsyncStorageEx from './AsyncStorageEx';
import DiaryEx from './DiaryEx/DiaryEx';
import ScrollViewEx from './ScrollViewEx';
import FsTest from './FsTest';
import FPSTest from './FPSTest';
import BlurTest from './BlurTest';
import SortListView from './SortListView';
import DeviceInfos from './DeviceInfos';
import MyView from './MyView';

class Jicheng1 extends Component {
  constructor(props){
    super(props);
    // if (Platform.OS === 'android'){
    //   console.log('android platform');
    // }else{
    //   console.log('ios platform');
    // }
  }
  configureScene(route, routeStack){
    return Navigator.SceneConfigs.FloatFromRight;
  }
  renderScene(route, navigator){
    let Component = null;
    this._navigator = navigator;
    switch(route.name){
      case "register":
        Component = RegisterLeaf; 
        break;
      case "waiting":
        Component = WaitingLeaf;
        break;
      case "transformtext":
        Component = TransformText;
        break;
      case "layouttext":
        Component = LayoutText;
        break;
      case "pointerevent":
        Component = PointerEvent;
        break;
      case "navibar":
        Component = NaviBar;
        break;
      case "imageequallyenlarge":
        Component = ShowImage;
        break;
      case "textshow":
        Component = TextShow;
        break;
      case "textinputshow":
        Component = TextInputShow;
        break;
      case "measure":
        Component = Measure;
        break;
      case 'asyncstorageex':
        Component = AsyncStorageEx;
        break;
      case 'diaryex':
        Component = DiaryEx;
        break;
      case 'scrollviewex':
        Component = ScrollViewEx;
        break;
      case 'fstest':
        Component = FsTest;
        break;
      case 'fpstest':
        Component = FPSTest;
        break;
      case 'blurtest':
        Component = BlurTest;
        break;
      case 'sortlistview':
        Component = SortListView;
        break;
      case 'deviceinfos':
        Component = DeviceInfos;
        break;
      case 'myview':
        Component = MyView;
        break;
    }

    return <Component {...route.params} navigator={navigator} />;
  }
  componentDidMount(){
    // var navigator = this._navigator;
  }
  componentWillUnmount(){
    
  }
  
  render() {
    return (
      <Navigator initialRoute={{name:'register'}}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Jicheng1', () => Jicheng1);
