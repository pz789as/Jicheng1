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
  Image,
  Platform,
  TextInput,
  ListView,
} from 'react-native';

import {
  MCV,
  faceMod,
  Utils,
} from './MCV';

export default class DiaryList extends Component {
  keyword='';
  constructor(props){
    super(props);
    this.state = {
      buttonText:'点击搜索日记列表',
    };
  }
  updateSearchKeyword(newWord){
    this.keyword = newWord;
  }
  render() {
    return (
      <View style={MCV.container}>
        <View style={MCV.firstRow}>
            { 
              (Platform.OS === 'android') ?
                  (
                    <View style={{borderWidth:1}}>
                        <TextInput autoCapitalize='none'
                            placeholder='输入搜索关键字'
                            clearButtonMode='while-editing'
                            onChangeText={this.updateSearchKeyword.bind(this)}
                            style={MCV.searchBarTextInput}/>
                    </View>
                  ):(
                    <TextInput autoCapitalize='none'
                        placeholder='输入搜索关键字'
                        clearButtonMode='while-editing'
                        onChangeText={this.updateSearchKeyword.bind(this)}
                        style={MCV.searchBarTextInput}/>
                  )
            }
            <TouchableOpacity onPress={this.props.writeDiary}>
                <Text style={MCV.middleButton}>写日记</Text>
            </TouchableOpacity>
        </View>

        <ListView dataSource={this.props.diaryListDataSource}
            renderRow={this.renderListItem.bind(this)}>
        </ListView>

        <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.back();}}>返回</Text>
      </View>
    );
  }
  renderListItem(log, sectionID, rowID){
    return (
      <TouchableOpacity onPress={()=>{this.props.selectListItem(rowID)}}>
        <View style={MCV.secondRow}>
          <Image style={MCV.modStyle} source={faceMod[log.mod].icon}/>
          <View style={MCV.subViewInReader}>
            <Text style={MCV.textInReader}>{log.title}</Text>
            <Text style={MCV.textInReader}>{this.getTimeString(log.time)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  getTimeString(aString){
    let cTime = new Date(aString);
    return Utils.getTimeString(cTime);
  }
}

