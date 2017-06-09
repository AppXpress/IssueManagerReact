/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import {
	StackNavigator,
} from 'react-navigation';

import Login from './src/pages/Login';
import Home from './src/pages/Home';

import IssueScreen from './src/pages/IssueScreen';

import Create from './src/pages/Create';

const IssueManager = StackNavigator({

	Main: { screen: Login },
  	Home: { screen: Home },

  	IssueScreen: { screen: IssueScreen},

		Create: { screen: Create },

});


AppRegistry.registerComponent('IssueManager', () => IssueManager);
