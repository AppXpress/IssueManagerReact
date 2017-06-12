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
import IssueList from './src/pages/IssueList';
import IssueDetails from './src/pages/IssueDetails';
import CreateIssue from './src/pages/CreateIssue';

const IssueManager = StackNavigator({
	Main: { screen: Login },
	IssueList: { screen: IssueList },
	IssueDetails: { screen: IssueDetails },
	CreateIssue: { screen: CreateIssue },
});

AppRegistry.registerComponent('IssueManager', () => IssueManager);
