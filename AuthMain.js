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
  Button,
} from 'react-native';

export default class AuthMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.button}>
          认证首页
        </Text>
        <View style={styles.button}>
          <Button
            title="登录"
            onPress={() => this.props.showLogin()}/>
        </View>
        <View style={styles.button}>
          <Button
            title="注册"
            onPress={() => this.props.showRegister()}/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin: 10,
  }
});
