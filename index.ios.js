/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Calculator from './calculator'
import SimpleTransitionApp from './SimpleTransitionApp'
import RouterFluxApp from './RouterFluxApp'

AppRegistry.registerComponent('RNPlayground', () => RouterFluxApp);
