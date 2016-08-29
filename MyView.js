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
  ScrollView,
  Dimensions,
  processColor,
} from 'react-native';

var {height, width} = Dimensions.get('window');

import DrawView from './DrawView';

export default class MyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <DrawView style={{width:width, height:height, backgroundColor:'#AAA'}}
            transPos={{x:50,y:100}}
            scaleValue={{x:1,y:1}}
            drawData={{
              order:['lines', 'rects', 'circles', 'texts'],
              lines:[
                {x1: -10, y1: 30, x2: 50, y2: 30, color: processColor('#555'), stroke: 1},
                {x1: 10, y1: 40, x2: 50, y2: 40, color: processColor('#555'), stroke: 1},
                {x1: 10, y1: 50, x2: 50, y2: 50, color: processColor('#0F0'), stroke: 1},
                {x1: 10, y1: 60, x2: 50, y2: 60, color: processColor('#0F0'), stroke: 1},
              ],
              rects:[
                {x: 10, y: 70, width: 50, height: 10, color: processColor('#FFF'), fill: 0},
                {x: 10, y: 90, width: 50, height: 10, color: processColor('#FFF'), fill: 1},
                {x: 10, y: 110, width: 50, height: 10, color: processColor('#FFF'), fill: 2, sideColor: processColor('#0FF'), sideWidth: 1},
              ],
              circles:[
                {x: 10, y: 150, radius: 10, color: processColor('#F00'), fill: 0},
                {x: 50, y: 150, radius: 10, color: processColor('#F00'), fill: 1},
                {x: 90, y: 150, radius: 10, color: processColor('#F00'), fill: 2, sideColor: processColor('#0FF'), sideWidth: 1},
              ],
              texts:[
                {x:10, y:150, color: processColor('#00F'), fontSize:14, text:'我'},
                {x:50, y:150, color: processColor('#00F'), fontSize:14, text:'你'},
                {x:90, y:150, color: processColor('#00F'), fontSize:14, text:'草字头'},
              ]
            }}>
          </DrawView>
          <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
        </ScrollView>
      </View>
    );
  }

  // render(){
  //   return (
  //     <View style={styles.container}>
  //       <ScrollView>
  //         <ScrollView horizontal={true}>
  //           <View style={{
  //             width: 1100,
  //             height: 1100, 
  //             backgroundColor:'white', 
  //             padding:10,
  //           }}>
  //           <View style={{
  //             width: 1000, 
  //             height: 1000, 
  //             backgroundColor:'red', 
  //             padding:10,
  //           }}/>
  //           </View>
  //         </ScrollView>
  //       </ScrollView>
  //       <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

