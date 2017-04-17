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
import {
  Actions,
  Scene,
  Router,
} from 'react-native-router-flux'

export default class RouterFluxApp extends Component {
  render() {

    return (
      <Router>
        <Scene key='auth'>
          <Scene key='authMain' component={() => this.getPage('authMain')} />
          <Scene key='login' component={() => this.getPage('login')} />
          <Scene key='register' component={() => this.getPage('register')} />
        </Scene>
        <Scene key='main' component={() => this.getPage('main')} />
      </Router>
    )
  }

  getPage(key) {
    let page = (
      <AuthMain
        showLogin={() => Actions.login()}
        showRegister={() => Actions.register()}/>
    )
    switch (key) {
      case 'login':
        page = <Login login={() => Actions.main({type: 'reset'})} />
        break
      case 'register':
        page = <Regisger register={() => Actions.main({type: 'reset'})} />
        break
      case 'main':
        page = <Main logout={() => Actions.auth({type: 'reset'})} />
      default:
    }
    return page
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
