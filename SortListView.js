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
  TouchableHighlight,
} from 'react-native';

var SortableListView = require('react-native-sortable-listview');

let data = { 
  hello: {text: 'world'},
  how: {text: 'are you'},
  test: {text: 123},
  this: {text: 'is'},
  a: {text: 'a'},
  real: {text: 'real'},
  drag: {text: 'drag and drop'},
  bb: {text: 'bb'},
  cc: {text: 'cc'},
  dd: {text: 'dd'},
  ee: {text: 'ee'},
  ff: {text: 'ff'},
  gg: {text: 'gg'},
  hh: {text: 'hh'},
  ii: {text: 'ii'},
  jj: {text: 'jj'},
  kk: {text: 'kk'}
};

let order = Object.keys(data);

class RowComponent extends Component{
  render() {
    return (
      <TouchableHighlight underlayColor={'#eee'} 
        style={styles.itemView}
        {...this.props.sortHandlers} >
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class SortListView extends Component {
  render() {
    // return (
    //   <View style={styles.container}>
    //     <SortableListView style={{flex:1}}
    //       data={data}
    //       order={order}
    //       onRowMoved={ (e) =>{
    //         order.splice(e.to, 0, order.splice(e.from, 1)[0]);
    //         this.forceUpdate();
    //       }}
    //       renderRow={(row) => {
    //         <RowComponent data={row} />
    //       }} />
    //     <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
    //   </View>
    // );

    return (
      <SortableListView style={{flex:1}}
          data={data}
          order={order}
          onRowMoved={this.onRowMoved.bind(this)}
          renderRow={row => {
            return (
              <TouchableHighlight underlayColor={'#eee'} 
                style={styles.itemView}
                {...this.props.sortHandlers} >
                <Text>{row.text}</Text>
              </TouchableHighlight>
            );
          }}
      />
    );
  }
  onRowMoved(e){
    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
    this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemView:{
    padding: 25, 
    backgroundColor: "#F8F8F8", 
    borderBottomWidth:1, 
    borderColor: '#eee'
  },
});

