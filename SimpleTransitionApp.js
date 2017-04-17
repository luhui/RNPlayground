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
import AuthMain from './AuthMain'
import Login from './Login'
import Regisger from './Register'
import Main from './Main'

export default class SimpleTransitionApp extends Component {
  constructor() {
    super()
    this.state = {
      page: 'authMain'
    }
  }
  render() {
    let page = (
      <AuthMain
        showLogin={() => this.setState({page: 'login'})}
        showRegister={() => this.setState({page: 'register'})}/>
    )
    switch (this.state.page) {
      case 'login':
        page = <Login login={() => this.setState({page: 'main'})} />
        break
      case 'register':
        page = <Regisger register={() => this.setState({page: 'main'})} />
        break
      case 'main':
        page = <Main logout={() => this.setState({page: 'authMain'})} />
      default:
    }
    return (
      <View style={styles.container}>
        {page}
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
