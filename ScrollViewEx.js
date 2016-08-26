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
  TouchableHightlight,
  ScrollView,
  RefreshControl,
} from 'react-native';

export default class ScrollViewEx extends Component {
  _onScrollBeginDrag(){
    console.log('begin drag');
  }
  _onScrollEndDrag(){
    console.log('end drag');
  }
  _onMomentumScrollBegin(){
    console.log('_onMomentumScrollBegin');
  }
  _onMomentumScrollEnd(){
    console.log('_onMomentumScrollEnd');
  }
  _onRefresh(){
    console.log('_onRefresh is called');
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}
            onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}
            onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
            onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
            refreshControl={
              <RefreshControl refreshing={true}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor='#ff0000'
                  title='Loading...'
                  colors={['#ff0000','#00ff00','#0000ff']}
                  progressBackgroundColor='#ffff00'/>
            }
            onScrollEndDrag={this._onScrollEndDrag.bind(this)}>

            <View style={styles.aView}/>
            <ScrollView horizontal={true}
                style={styles.midScrollView}>
                <View style={styles.bView}/>
                <View style={styles.bView}/>
            </ScrollView>
            <View style={styles.aView}/>
        </ScrollView>
        <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    backgroundColor:'#cccccc',
  },
  midScrollView: {
    height:150,
    borderWidth:1,
    borderColor:'black',
  },
  aView:{
    margin:1,
    padding:0,
    backgroundColor:'#eaeaea',
    height:375,
  },
  bView:{
    flex:1,
    height:148,
    width:300,
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'grey',
  },
});

