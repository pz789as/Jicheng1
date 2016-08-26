/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBarIOS,
    AsyncStorage,
    Dimensions,
} from 'react-native';

let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let textSize = totalWidth / 18;
let readingUITitleHeight = textSize * 6;
let diaryBodyLine = totalHeight / textSize - 6;
let returnButtonHeight = textSize * 5;

let faceMod = [
    {icon:require('./res/angry.jpeg'),name:'愤怒',},
    {icon:require('./res/annoy.jpeg'),name:'恼火',},
    {icon:require('./res/cool.jpeg'),name:'酷毙',},
    {icon:require('./res/cry.jpeg'),name:'大哭',},
    {icon:require('./res/funny.jpeg'),name:'搞怪',},
    {icon:require('./res/hungry.jpeg'),name:'饥饿',},
    {icon:require('./res/laugh.jpeg'),name:'大笑',},
    {icon:require('./res/mushy.jpeg'),name:'无语',},
    {icon:require('./res/shy.jpeg'),name:'惊恐',},
    {icon:require('./res/spit.jpeg'),name:'想吐',},
];

let Utils = {
    getTimeString: function(cTime){
        return '' + cTime.getFullYear() + '年' +
            (cTime.getMonth()+1) + '月' +
            cTime.getDate() + '日 星期' +
            (cTime.getDay() + 1) + ' ' +
            cTime.getHours() + ':' +
            cTime.getMinutes();
    },
};

let MCV = StyleSheet.create({
    container:{
        top:2,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
        borderColor:'black',
        borderWidth:1,
    },
    firstRow:{
        height:textSize*1.4 + 2,
        flexDirection:'row',
        width:totalWidth - 4,
        justifyContent:'space-around',
        margin:2
    },
    longButton:{
        height:textSize * 1.4,
        backgroundColor:'grey',
        width:textSize*10,
        borderRadius:8,
        textAlign:'center',
        fontSize:textSize,
    },
    middleButton:{
        height:textSize*1.4,
        backgroundColor:'grey',
        width:textSize*5,
        borderRadius:8,
        textAlign:'center',
        fontSize:textSize,
    },
    diaryAbstractList:{
        flex:1,
        margin:4,
        width:totalWidth-4,
        justifyContent:'center',
        backgroundColor:'grey',
    },
    diaryBodyStyle:{
        flex:1,
        width:totalWidth-8,
        fontSize:textSize,
        backgroundColor:'grey',
        margin:4,
    },
    smallButton:{
        height:textSize*1.4,
        backgroundColor:'grey',
        width:textSize*3,
        borderRadius:8,
        textAlign:'center',
        fontSize:textSize,
    },
    modStyle:{
        height:textSize*3.2,
        width:textSize*3.2,
        borderRadius:textSize*1.6,
    },
    subViewInReader:{
        width:totalWidth-5-textSize*3.2,
    },
    textInReader:{
        height:textSize*1.4,
        fontSize:textSize,
        backgroundColor:'grey',
        margin:2,
    },
    secondRow:{
        flexDirection:'row',
        alignItems:'center',
    },
    titleInputStyle:{
        fontSize:textSize,
        backgroundColor:'grey',
        height:textSize*2.4,
        color:'black',
        margin:4,
        borderWidth:2,
        borderColor:'black',
    },
    searchBarTextInput:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        height:textSize*1.4,
        width:textSize*10,
        paddingTop:0,
        paddingBottom:0,
        top:1,
        left:1,
        fontSize:14,
    },
});

module.exports = {
    faceMod,
    MCV,
    Utils,
}