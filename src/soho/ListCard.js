import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableHighlight,
	View,
	Text
} from 'react-native';

import {
	getHandler
} from './Tools';

export default class Card extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getText(type) {
		if (this.props[type]) {
			return (
				<Text style={styles[type]}>
					{this.props[type]}
				</Text>
			);
		}
	}

	getButton() {
		if (Platform.OS == 'android') {
			return (
				<TouchableNativeFeedback onPress={getHandler(this, 'onPress')}>
					{this.getView()}
				</TouchableNativeFeedback>
			);
		}
		return (
			<TouchableHighlight onPress={getHandler(this, 'onPress')}>
				{this.getView()}
			</TouchableHighlight>
		);
	}

	getView() {
		return (
			<View
				{...this.props}
				style={[styles.view, this.props.style]}
			>
				{this.getText('main')}
				{this.getText('secondary')}
				{this.getText('tertiary')}
			</View>
		);
	}

	render() {
		if (this.props.onPress) {
			return this.getButton();
		}
		return this.getView();
	}
};

const styles = StyleSheet.create({
	view: {
		padding: 20,
		backgroundColor: '#ffffff',
		borderBottomWidth: 1,
		borderBottomColor: '#bdbdbd'
	},
	main: {
		fontSize: 14,
		color: '#1a1a1a'
	},
	secondary: {
		fontSize: 12,
		color: '#5c5c5c'
	},
	tertiary: {
		fontSize: 10,
		color: '#999999',
		fontWeight: 'bold'
	}
});
