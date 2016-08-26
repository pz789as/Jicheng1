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

let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;

export default class ConfirmDialog extends Component {
  static defaultProps = {
    promptToUser:'123456789',
  };
  static propTypes = {
    userConfirmed: React.PropTypes.func.isRequired,
    userCanceled: React.PropTypes.func.isRequired,
    promptToUser: React.PropTypes.string.isRequired,
    
    /*
    属性名称:React.PropTypes.array  //js基本类型
    属性名称:React.PropTypes.bool   //js基本类型
    属性名称:React.PropTypes.func   //js基本类型
    属性名称:React.PropTypes.number //js基本类型
    属性名称:React.PropTypes.object //js基本类型
    属性名称:React.PropTypes.string //js基本类型

    属性名称:React.PropTypes.node   //可渲染节点（数字，字符串，数字数组，字符串数组）
    属性名称:React.PropTypes.element  //某个React元素
    属性名称:React.PropTypes.instanceOf(NameOfAClass) //某个指定类的实例
    属性名称:React.PropTypes.oneOf(['值1','值2']) //取值为特定的几个值
    属性名称:React.PropTypes.oneOfType([  //指定类型中的任意一个
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(NameOfAClass)
    ])
    属性名称:React.PropTypes.arrayOf(React.PropTypes.number)  //指定类型的数组
    属性名称:React.PropTypes.objectOf(React.PropTypes.number) //一个有特定成员变量的对象
    属性名称:React.PropTypes.shape({  //一个指定构成方式的对象
      color:React.PropTypes.string,
      fontSize:React.PropTypes.number,
    })
    属性名称:React.PropTypes.any  //任意类型
    */
  };
  render() {
    return (
      <View style={styles.confirmCont}>
        <View style={styles.dialogStyle}>
          <Text style={styles.textPrompt}>{this.props.promptToUser}</Text>
          <Text style={styles.yesButton}
            onPress={this.props.userConfirmed}
            numberOfLines={3}>{'\r\n'}确 定</Text>
          <Text style={styles.cancelButton}
            onPress={this.props.userCanceled}
            numberOfLines={3}>{'\r\n'}取 消</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  confirmCont: {
    position: 'absolute',
    top:0,
    width:totalWidth,
    height:totalHeight,
    backgroundColor:'rgba(52,52,52,0.5)'
  },
  dialogStyle:{
    position: 'absolute',
    top:totalHeight * 0.4,
    left:totalWidth / 10,
    width: totalWidth * 0.8,
    height: totalHeight * 0.3,
    backgroundColor: 'white',
  },
  textPrompt:{
    position: 'absolute',
    top:10,
    left:10,
    fontSize:20,
    color:'black',
  },
  yesButton:{
    position:'absolute',
    bottom:10,
    left:10,
    width:totalWidth*0.35,
    height:totalHeight*0.12,
    backgroundColor:'grey',
    fontSize:20,
    color:'white',
    textAlign:'center',
  },
  cancelButton:{
    position:'absolute',
    bottom:10,
    right:10,
    width:totalWidth*0.35,
    height:totalHeight*0.12,
    backgroundColor:'grey',
    fontSize:20,
    color:'white',
    textAlign:'center',
  },
});

