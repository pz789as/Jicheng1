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
  TextInput,
} from 'react-native';

import {
  MCV,
  faceMod,
} from './MCV';

export default class DiaryReader extends Component {
  render() {
    return (
      <View style={MCV.container}>
        <View style={MCV.firstRow}>
            <TouchableOpacity onPress={this.props.returnPressed}>
                <Text style={MCV.middleButton}>返 回</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.readingPreviousPressed}>
                <Text style={MCV.middleButton}>上一篇</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.readingNextPressed}>
                <Text style={MCV.middleButton}>下一篇</Text>
            </TouchableOpacity>
        </View>
        <View style={MCV.secondRow}>
            <Image style={MCV.modStyle}
                source={this.props.diaryMod}/>
            <View style={MCV.subViewInReader}>
                <Text style={MCV.textInReader}>
                    标题：{this.props.diaryTitle}
                </Text>
                <Text style={MCV.textInReader}>
                    时间：{this.props.diaryTime}
                </Text>
            </View>
        </View>
        <TextInput style={[MCV.diaryBodyStyle,{color:'black'}]}
            multiline={true}
            editable={false}
            value={this.props.diaryBody} />
      </View>
    );
  }
}


