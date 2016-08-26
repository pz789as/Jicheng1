/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StatusBar,
  AsyncStorage,
  ListView,
} from 'react-native';

import DiaryList from './DiaryList';
import DiaryWriter from './DiaryWriter';
import DiaryReader from './DiaryReader';

import {
  faceMod,
  Utils,
} from './MCV';

export default class DiaryEx extends Component {
    realDairyList = null;
    listIndex = 0;
    constructor(props){
        super(props);
        // AsyncStorage.clear();
        this.realDairyList = null;
        this.listIndex = 0;
        this.state = {
            uiCode:1,
            diaryListDataSource:new ListView.DataSource({
                rowHasChanged:(oldRow, newRow)=>{oldRow !== newRow}
            }),
            diaryMod: faceMod[0].icon,
            diaryTime:'读取中...',
            diaryTitle:'读取中...',
            diaryBody:'读取中...',
        }

        AsyncStorage.getAllKeys().then(
            (keys)=>{
                AsyncStorage.multiGet(keys).then(
                    (results)=>{
                        let j = results.length;
                        this.realDairyList = Array();
                        for(let i=0;i<j;i++){
                            this.realDairyList[i] = JSON.parse(results[i][1]);
                        }
                        this.bubleSortDiaryList();
                        if (j>0){
                            j--;
                            this.listIndex = j;
                            let newModIcon = faceMod[this.realDairyList[j].mod].icon;
                            let newTitle = this.realDairyList[j].title;
                            let newBody = this.realDairyList[j].body;
                            let cTime = new Date(this.realDairyList[j].time);
                            let timeString = Utils.getTimeString(cTime);
                            this.setState({
                                diaryListDataSource:this.state.diaryListDataSource.cloneWithRows(this.realDairyList),
                                diaryMod:newModIcon,
                                diaryTime:timeString,
                                diaryTitle:newTitle,
                                diaryBody:newBody,
                            });
                        }else{
                            this.setState({
                                diaryTime:'没有历史日记',
                                diaryTitle:'没有历史日记',
                                diaryBody:'',
                            });
                        }
                    }
                ).catch(
                    (errors)=>{
                        console.log('获取本地数据出错: count ' + errors.length);
                    }
                )
            }
        ).catch(
            (errors)=>{
                console.log('获取keys数据出错: ' + errors.length);
            }
        )
    }
    backMenu(){
        this.props.navigator.pop();
        console.log('back');
    }
    bubleSortDiaryList(){
        let tempObj;
        let len1 = this.realDairyList.length;
        let len2 = len1 - 1;
        for(let i=0;i<len1;i++){
            for(let j=0;j<len2-1;j++){
                if (this.realDairyList[j].index>this.realDairyList[j+1].index) {
                    tempObj = this.realDairyList[j];
                    this.realDairyList[j] = this.realDairyList[j+1];
                    this.realDairyList[j+1] = tempObj;
                }
            }
        }
    }
    readingPreviousPressed(){
        if (this.listIndex == 0) return;
        this.listIndex--;
        let j = this.listIndex;
        let newModIcon = faceMod[this.realDairyList[j].mod].icon;
        let newTitle = this.realDairyList[j].title;
        let newBody = this.realDairyList[j].body;
        let cTime = new Date(this.realDairyList[j].time);
        let timeString = Utils.getTimeString(cTime);
        this.setState({
            diaryMod:newModIcon,
            diaryTime:timeString,
            diaryTitle:newTitle,
            diaryBody:newBody,
        });
    }
    readingNextPressed(){
        if (this.realDairyList.length == 0) return;
        if (this.listIndex == (this.realDairyList.length - 1)) return;
        this.listIndex++;
        let j = this.listIndex;
        let newModIcon = faceMod[this.realDairyList[j].mod].icon;
        let newTitle = this.realDairyList[j].title;
        let newBody = this.realDairyList[j].body;
        let cTime = new Date(this.realDairyList[j].time);
        let timeString = Utils.getTimeString(cTime);
        this.setState({
            diaryMod:newModIcon,
            diaryTime:timeString,
            diaryTitle:newTitle,
            diaryBody:newBody,
        });
    }
    returnPressed(){
        this.setState({
            uiCode:1,
        });
    }
    saveDiaryAndReturn(newDiaryMod, newDiaryTitle, newDiaryBody){
        let cTime = new Date();//获取当前时间
        let timeString = Utils.getTimeString(cTime);
        let aDiary = Object();
        aDiary.title = newDiaryTitle;
        aDiary.body = newDiaryBody;
        aDiary.mod = newDiaryMod;
        aDiary.time = cTime;
        aDiary.sectionID = '' + cTime.getFullYear() + '年' + (cTime.getMonth()+1) + '月';//用来对日记列表进行分段显示
        aDiary.index = Date.parse(cTime);//从当前时间生成唯一值，用来索引日记列表，这个值精确到毫秒，可以认为它是唯一的

        AsyncStorage.setItem('' + aDiary.index, JSON.stringify(aDiary)).then(
            ()=>{
                console.log('saving succeed');
            }
        ).catch(
            (error)=>{
                console.log('saving failed, error ' + error.message);
            }
        );

        let totalLength = this.realDairyList.length;
        this.realDairyList[totalLength] = aDiary;
        this.listIndex = totalLength;
        let newModIcon = faceMod[newDiaryMod].icon;
        this.setState({
            uiCode:1,
            diaryListDataSource:this.state.diaryListDataSource.cloneWithRows(this.realDairyList),
            diaryMod:newModIcon,
            diaryTime:timeString,
            diaryTitle:newDiaryTitle,
            diaryBody:newDiaryBody,
        });
    }
    writeDiary(){
        this.setState({
            uiCode:3,
        });
    }
    searchKeyword(keyword){
        console.log('search button pressed, the keyword is:' + keyword);
    }
    selectListItem(rowID){
        this.listIndex = rowID;
        let newDiaryTitle = this.realDairyList[rowID].title;
        let newDiaryBody = this.realDairyList[rowID].body;
        let newModIcon = faceMod[this.realDairyList[rowID].mod].icon;
        let currentTime = new Date(this.realDairyList[rowID].time);
        let timeString = Utils.getTimeString(currentTime);
        this.setState({
            uiCode:2,
            diaryBody:newDiaryBody,
            diaryTitle:newDiaryTitle,
            diaryMod:newModIcon,
            diaryTime:timeString,
        });
    }
    showDiaryList(){
        return (
            <DiaryList back={this.backMenu.bind(this)}
                fakeListTitle={this.state.diaryTitle}
                fakeListMod={this.state.diaryMod}
                selectListItem={this.selectListItem.bind(this)}
                searchKeyword={this.searchKeyword}
                writeDiary={this.writeDiary.bind(this)}
                diaryListDataSource={this.state.diaryListDataSource}
                />
        );
    }
    showDiaryReader(){
        return (
            <DiaryReader returnPressed={this.returnPressed.bind(this)}
                diaryTitle={this.state.diaryTitle}
                diaryTime={this.state.diaryTime}
                diaryMod={this.state.diaryMod}
                diaryBody={this.state.diaryBody}
                readingNextPressed={this.readingNextPressed.bind(this)}
                readingPreviousPressed={this.readingPreviousPressed.bind(this)}
                />
        );
    }
    showDiaryWriter(){
        return (
            <DiaryWriter returnPressed={this.returnPressed.bind(this)}
                saveDiary={this.saveDiaryAndReturn.bind(this)}/>
        );
    }
    componentWillMount(){
        if (StatusBar != null){
            StatusBar.setHidden(true);
        }
    }
    componentWillUnmount(){
        if (StatusBar != null){
            StatusBar.setHidden(false);
        }
    }
    render() {
        if (this.state.uiCode === 1){
            return this.showDiaryList();
        }else if (this.state.uiCode === 2){
            return this.showDiaryReader();
        }else if (this.state.uiCode === 3){
            return this.showDiaryWriter();
        }
    }
}

