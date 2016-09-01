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
  Navigator,
  NativeModules,
  NativeAppEventEmitter,
  ScrollView,
  Linking,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';

let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.1;
let componentWidth = totalWidth * 0.8;

import ConfirmDialog from './ConfirmDialog';

var ExampleInterface = NativeModules.ExampleInterface;


//热更新测试
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];//注意这里目前只有ios的
//热更新 end

export default class RegisterLeaf extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputedNum: '',
      inputedPW: '',
      needToConfirm:false,
    };
  }
  doUpdate(info){
    downloadUpdate(info).then((hash)=>{
      Alert.alert('提示', '下载完毕，是否重启应用？', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '否', },
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      ]);
    }).catch((err)=>{
      Alert.alert('提示', '更新失败');
    });
  }
  checkUpdate(){
    checkUpdate(appKey).then((info)=>{
      if (info.expired){
        Alert.alert('提示', '您的应用版本已更新，请前往应用商店下载新的版本', [
          {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        ]);
      }else if (info.upToDate){
        Alert.alert('提示', '您的应用版本已是最新。');
      }else {
        Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载？\n'+info.description, [
          {text: '是', onPress: ()=>{this.doUpdate(info)}},
          {text: '否', },
        ]);
      }
    }).catch((err)=>{
      Alert.alert('提示', '更新失败');
    })
  }
  componentWillMount(){
    if (isFirstTime) {
      Alert.alert('提示', '这是当前版本第一次启动，是否需要模拟启动失败？失败将回滚到上一版本', [
        {text: '是', onPress: ()=>{throw new Error('模拟启动失败，请重启应用')}},
        {text: '否', onPress: ()=>{markSuccess()}},
      ]);
    }else if (isRolledBack){
      Alert.alert('提示', '刚刚更新失败了，版本被回滚。');
    }

    // ExampleInterface.sendMessage('{\"msgType\":\"pickContact\"}');

    this.NativeMsgSubscription = NativeAppEventEmitter.addListener(
      'NativeModuleMsg', 
      (reminder) => {
        this.handleNativeInterfaceMsg(reminder.message);
      }
    );
  }
  handleNativeInterfaceMsg(msg){
    console.log('received msg from Object-C module: ' + msg);
  }
  updateNum(newText){
    this.setState({
      inputedNum: newText,
    });
  }
  updatePW(newText){
    this.setState({
      inputedPW:newText,
    });
  }
  render() {
    if (this.state.needToConfirm){
      return this.renderWithDialog();
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.scrollChildView}>
          <View >
            <TextInput style={styles.numberInputStyle}
              placeholder={'请出入手机号'}
              onChangeText={(newText)=>{this.updateNum(newText);}}/>
          </View>
          <Text style={styles.textPromptStyle}>
              您输入的手机号:{this.state.inputedNum}
            </Text>
          <View >
            <TextInput style={styles.passwordInputStyle}
              placeholder={'请输入密码'}
              password = {true}
              onChangeText={(newText)=>{this.updatePW(newText);}}/>
          </View>
          <Text style={styles.bigTextPrompt}
                  onPress={this.userPressConfirm.bind(this)}>
              确  定
            </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'transformtext'});}}>
                  Transform 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'layouttext'});}}>
                  Layout 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'pointerevent'});}}>
                  PointerEvent 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({
                    params:{
                      naviBarStatus:[0,1,2,3],
                      onNaviBarPress:(i)=>{console.log(i);}
                    },
                    name:'navibar'
                  });}}>
                  NaviBar 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'imageequallyenlarge'});}}>
                  ImageEquallyEnlarge 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'textshow'});}}>
                  TextShow 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'textinputshow'});}}>
                  TextInputShow 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'measure'});}}>
                  Measure 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'asyncstorageex'});}}>
                  AsyncStorage 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'diaryex'});}}>
                  Diary项目 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'scrollviewex'});}}>
                  ScrollViewEx 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'fstest'});}}>
                  FsTest&Sound 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'fpstest'});}}>
                  FPSTest 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'blurtest'});}}>
                  Blur 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'sortlistview'});}}>
                  SortListView 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'deviceinfos'});}}>
                  DeviceInfos 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'myview'});}}>
                  自定义原生UI组件 展示
          </Text>
          <Text style={styles.testSelect} 
                onPress={
                  ()=>{this.props.navigator.push({name:'socketio'});}}>
                  SocketIO插件 展示
          </Text>
        </View>
        <View style={styles.updateStyle}>
          <Text style={styles.textStyle}>
            热更新测试
          </Text>
          <Text style={styles.textStyle}>
            这是版本一{'\n'}
            当前包版本号： {packageVersion}{'\n'}
            当前版本Hash: {currentVersion||'(空)'}
          </Text>
          <TouchableOpacity onPress={this.checkUpdate.bind(this)}>
            <Text style={styles.testSelect}>
              点击这里检查更新
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  renderWithDialog(){
    console.log('renderWithDialog');
    return (
      <View style={styles.container}>
        <TextInput style={styles.numberInputStyle}
          placeholder={'请出入手机号'}
          onChangeText={(newText)=>{this.updateNum(newText);}}/>
        <Text style={styles.textPromptStyle}>
          您输入的手机号:{this.state.inputedNum}
        </Text>
        <TextInput style={styles.passwordInputStyle}
          placeholder={'请输入密码'}
          password = {true}
          onChangeText={(newText)=>{this.updatePW(newText);}}/>
        <Text style={styles.bigTextPrompt}
              onPress={this.userConfirmed.bind(this)}>
          确  定
        </Text>
        <ConfirmDialog userConfirmed={this.userConfirmed.bind(this)}
          userCanceled={this.userCanceled.bind(this)}
          promptToUser={'使用'+this.state.inputedNum+'号码登录？'}/>
      </View>
    )
  }
  userPressConfirm(){
    this.setState({
      needToConfirm: true,
    });

    // ExampleInterface.showContactView('aMessage').then(
    //   (result)=>{
    //     console.log(result)
    //   }).catch((code,message,error)=>{
    //     console.log(code);
    //     console.log(message);
    //     console.log(error);
    //   });
  }
  userCanceled(){
    this.setState({
      needToConfirm: false,
    });
  }
  userConfirmed(){
    this.setState({
      needToConfirm: false,
    });
    this.props.navigator.replace({
      params:{
        phoneNumber: this.state.inputedNum,
        userPW: this.state.inputedPW,
      },
      name:'waiting',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#F00',
  },
  contentContainer: {
      paddingVertical: 20
  },
  scrollChildView:{
    flex:1, 
    alignItems: 'center'
  },
  numberInputStyle:{
    height:30,
    width:componentWidth,
    backgroundColor:'gray',
    fontSize:20,
  },
  textPromptStyle:{
    marginTop:10,
    width:componentWidth,
    fontSize:20,
  },
  passwordInputStyle:{
    marginTop:10,
    width:componentWidth,
    height:30,
    backgroundColor:'gray',
    fontSize:20,
  },
  bigTextPrompt:{
    marginTop:10,
    width:componentWidth,
    backgroundColor:'gray',
    color:'white',
    textAlign:'center',
    fontSize:60
  },
  testSelect:{
    marginTop:10,
    width:componentWidth,
    backgroundColor:'gray',
    color:'white',
    textAlign:'center',
    fontSize: 20,
  },
  updateStyle:{
    borderWidth: 1,
    borderColor: '#f00', 
    alignItems: 'center',
    marginTop:20,
    paddingVertical: 10,
  },
  textStyle:{
    fontSize:20,
    textAlign:'center',
    color:'black',
  },
});

