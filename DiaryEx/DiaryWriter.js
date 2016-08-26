/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AlertIOS,
} from 'react-native';

import {
  MCV,
  faceMod,
} from './MCV';

export default class DiaryWriter extends Component {
    diaryBody='test body';
    diaryTitle='test title';
    modCode=0;
    constructor(props){
        super(props);
        this.state = {
            modText:'请选择心情',
        };
    }
  returnPressed(){
      AlertIOS.alert('请确认','你确定要退回日记列表吗？',
        [
            {text:'确定',onPress:()=>{this.props.returnPressed();}},
            {text:'取消'}
        ]
      );
  }
  selectMod(){
      let tempString;
      if (this.modCode === faceMod.length - 1) this.modCode = 0;
      else this.modCode = this.modCode + 1;
      tempString = '现在的心情:' + faceMod[this.modCode].name;
      this.setState({
          modText:tempString,
      });
  }
  render() {
    return (
      <View style={MCV.container}>
        <View style={MCV.firstRow}>
            <TouchableOpacity onPress={this.returnPressed.bind(this)}>
                <Text style={MCV.smallButton}>返 回</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.selectMod.bind(this)}>
                <Text style={MCV.longButton}>{this.state.modText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                    this.props.saveDiary(this.modCode,this.diaryTitle,this.diaryBody);
                }}>
                <Text style={MCV.smallButton}>保 存</Text>
            </TouchableOpacity>
        </View>
        <TextInput style={MCV.titleInputStyle}
            placeholder={'写个日记标题吧'}
            onChangeText={(text)=>{this.diaryTitle=text;}}/>
        <TextInput style={MCV.diaryBodyStyle}
            multiline={true}
            placeholder={'日记正文请在此输入'}
            onChangeText={(text)=>{this.diaryBody=text;}}/>
      </View>
    );
  }
}


