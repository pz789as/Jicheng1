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
  TouchableOpacity,
} from 'react-native';

var fs = require('react-native-fs');
var path = fs.DocumentDirectoryPath + '/test1.txt';
var sound = require('react-native-sound');

export default class FsTest extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(fs.MainBundlePath);
    console.log(fs.CachesDirectoryPath);
    console.log(fs.DocumentDirectoryPath);
    console.log(fs.TemporaryDirectoryPath);
    console.log(fs.ExternalDirectoryPath);
  }
  ReadDir(){
    fs.readDir(fs.MainBundlePath).then((result)=>{
      console.log('GOT RESULT', result);
      return Promise.all([fs.stat(result[0].MainBundlePath), result[0].path]);
    })
    .then((statResult)=>{
      if (statResult[0].isFile()){
        return fs.readFile(statResult[1], 'uft8');
      }
      return 'no files';
    })
    .then((contents)=>{
      console.log(contents);
    })
    .catch((err)=>{
      console.log(err.message, err.code);
    });
  }
  createFile(){
    fs.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success)=>{
      console.log('FILE WRITTEN');
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }
  DeleteFile(){
    fs.unlink(path)
    .spread((success, path)=>{
      console.log('FILE DELETED', success, path);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }
  uploadBegin(response){
    var jobId = response.jobId;
    console.log('UPLOAD HAS BEGUN! JobId:' + jobId);
  };
  uploadProgress(response){
    var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
    console.log('UPLOAD IS' + percentage + '% DONE!');
  };
  UploadFile(){
    var uploadUrl = 'http://192.169.1.19:8080/';

    var files = [
      {
        name: 'dialog0_0_0',
        filename: 'dialog0_0_0.mp3',
        filepath: fs.DocumentDirectoryPath + '/dialog0_0_0.mp3',
        filetype: 'audio/mp3',
      },
      {
        name: 'test1',
        filename: 'test1.txt',
        filepath: fs.DocumentDirectoryPath + '/test1.txt',
        filetype: 'text/txt',
      },
    ];

    fs.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'audio' : 'sound',
      },
      begin: this.uploadBegin.bind(this),
      progress: this.uploadProgress.bind(this),
    })
    .then((response) => {
      if (response.statusCode == 200){
        console.log('FILES UPLOAD!');
      }else {
        console.log('SERVER ERROR!');
      }
    })
    .catch((err)=>{
      if (err.description === 'cancelled'){
        console.log('call cancelled by user');
      }
      console.log(err);
    });
  }
  BiginDownload(response){
    console.log('BiginDownload', response);
  }
  ProgressDownload(response){
    console.log('ProgressDownload', response);
  }
  DownloadFile(){
    fs.downloadFile({
      // fromUrl: 'https://github.com/pz789as/Other/blob/master/LiuliSpeak/Lessons/lesson1.json',
      fromUrl: 'http://192.169.1.19:8080/Other/LiuliSpeak/Lessons/lesson1.json',
      toFile: fs.DocumentDirectoryPath + '/lesson1.json',
      bigin: this.BiginDownload.bind(this),
      progress: this.ProgressDownload.bind(this),
    })
    .then((response)=>{
      console.log('DownloadFile then', response);
    })
    .catch((err)=>{
      console.log('DownloadFile catch', err);
    });
  }
  PlaySound(){
    var localPath = fs.DocumentDirectoryPath + '/dialog0_0_1.mp3';
    fs.downloadFile({
      fromUrl: 'http://192.169.1.19:8080/Other/LiuliSpeak/Lessons/lesson1_mp3/dialog0_0_1.mp3',
      toFile: localPath,
    })
    .then((response)=>{
      console.log('DownloadFile then', response);
      if (response.statusCode == 200){
        console.log('FILES DOWNLOAD!');
        this.sound = new sound('dialog0_0_1.mp3', sound.DOCUMENT, (error)=>{
          if (error) {
            console.log('failed to load the sound', error);
          }else {
            console.log('duration in seconds: ' + this.sound.getDuration() +
              ',number of channels: ' + this.sound.getNumberOfChannels());

            this.sound.play((success)=>{
              if (success) {
                console.log('successfully finished playing');
              }else{
                console.log('playback failed due to audio decoding errors');
              }
            });
          }
        });
      }else {
        console.log('SERVER ERROR!');
      }
    })
    .catch((err)=>{
      console.log('DownloadFile catch', err);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.ReadDir.bind(this)}>
          <Text style={styles.welcome}>
            读取路径和文件
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.createFile.bind(this)}>
          <Text style={styles.welcome}>
            创建文件
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.DeleteFile.bind(this)}>
          <Text style={styles.welcome}>
            删除文件
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.UploadFile.bind(this)}>
          <Text style={styles.welcome}>
            上传文件
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.DownloadFile.bind(this)}>
          <Text style={styles.welcome}>
            下载文件
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.PlaySound.bind(this)}>
          <Text style={styles.welcome}>
            下载之后播放
          </Text>
        </TouchableOpacity>

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
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
});

