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
  AsyncStorage,
} from 'react-native';

let baseData = require('./data/base.json');
let newJSONString = JSON.stringify(baseData);
// JSON.parse('aString');字符串转json实例，
// 该方法不能带有尾逗号，例如：JSON.parse('{"name":"zhangsan",}')，这会出现异常，要注意

export default class AsyncStorageEx extends Component {
  constructor(props){
    super(props);
    AsyncStorage.setItem('name', 'willdelete').then(
      ()=>{
        console.log('save willdelete success！');
      }
    ).catch(
      (error)=>{
        console.log('save willdelete failed! ' + error.message);
      }
    );
    AsyncStorage.setItem('name1', '张三').then(
      ()=>{
        console.log('save 张三 success！');
      }
    ).catch(
      (error)=>{
        console.log('save 张三 failed! ' + error.message);
      }
    );
    
    AsyncStorage.multiSet([['name2','张三'],['name3','李四'],['name4','王五']]).then(
      ()=>{
        console.log('save array success');
      }
    ).catch(
      (errors)=>{
        console.log('save array failed! count:' + errors.length);
        console.log(errors);
      }
    );

    AsyncStorage.getAllKeys().then(
      (keys)=>{
        console.log(keys);
      }
    ).catch(
      (errors)=>{
        console.log('get all keys failed! count:' + errors.length);
        console.log(errors);
      }
    );

    AsyncStorage.removeItem('name').then(
      ()=>{
        console.log('remove item of name success!');
      }
    ).catch(
      (error)=>{
        console.log('remove item of name failed!' + error.message);
      }
    );

    this.state = {
      text1:'name1',
      text2:'name2',
      text3:'name3',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.text1}
        </Text>
        <Text style={styles.instructions}>
          {this.state.text2}
        </Text>
        <Text style={styles.instructions}>
          {this.state.text3}
        </Text>

        <Text style={[styles.instructions, {marginTop:20,fontSize:30,backgroundColor:'grey',fontWeight:'bold'}]}
              onPress={
                ()=>{
                  AsyncStorage.getItem('name1').then(
                    (result)=>{
                      this.setState(
                        {text1:result}
                      );
                    }
                  ).catch(
                    (error)=>{
                      console.log('read 张三 failed! ' + error.message);
                    }
                  );
                  
                  AsyncStorage.multiGet(['name2','name3','name4']).then(
                    (results)=>{
                      this.setState({
                        text1:results[0][1],
                        text2:results[1][1],
                        text3:results[2][1],
                      });
                    }
                  ).catch(
                    (errors)=>{
                      console.log('save array failed! count:' + errors.length);
                      console.log(errors);
                    }
                  );
                }
              }>
          读取AsyncStorage数据
        </Text>

        <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

