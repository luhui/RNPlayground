import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.button}>
          注册页
        </Text>
        <View style={styles.button}>
          <Button
            title="注册"
            onPress={() => this.props.register()}/>
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
