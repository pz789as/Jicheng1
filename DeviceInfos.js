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
} from 'react-native';

var DeviceInfo = require('react-native-device-info');

export default class DeviceInfos extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>
            DeviceInfo 插件
          </Text>
          <Text style={styles.instructions}>
            {"Device Unique ID: " + DeviceInfo.getUniqueID()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Manufacturer: " + DeviceInfo.getManufacturer()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Model: " + DeviceInfo.getModel()}
          </Text>
          <Text style={styles.instructions}>
            {"Device ID: " + DeviceInfo.getDeviceId()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Name: " + DeviceInfo.getSystemName()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Version: " + DeviceInfo.getSystemVersion()}
          </Text>
          <Text style={styles.instructions}>
            {"Bundle Id: " + DeviceInfo.getBundleId()}
          </Text>
          <Text style={styles.instructions}>
            {"Build Number: " + DeviceInfo.getBuildNumber()}
          </Text>
          <Text style={styles.instructions}>
            {"App Version: " + DeviceInfo.getVersion()}
          </Text>
          <Text style={styles.instructions}>
            {"App Version (Readable): " + DeviceInfo.getReadableVersion()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Name: " + DeviceInfo.getDeviceName()}
          </Text>
          <Text style={styles.instructions}>
            {"User Agent: " + DeviceInfo.getUserAgent()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Locale: " + DeviceInfo.getDeviceLocale()}
          </Text>
          <Text style={styles.instructions}>
            {"Device Country: " + DeviceInfo.getDeviceCountry()}
          </Text>
          <Text style={styles.instructions}>
            {"App Instance ID: " + DeviceInfo.getInstanceID()}
          </Text>
          <Text style={{textAlign:'center',marginTop:30,backgroundColor:'gray',color:'white',fontSize:40}} onPress={()=>{this.props.navigator.pop();}}>返回</Text>
        </ScrollView>
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

