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
	getHandler,
	getColor
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

	getContent() {
		if (this.props.main || this.props.secondary || this.props.tertiary) {
			return (
				<View style={styles.innerView}>
					{this.getText('main')}
					{this.getText('secondary')}
					{this.getText('tertiary')}
				</View>
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
				{this.getContent()}
				{this.props.children}
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
		backgroundColor: getColor('white-0'),
		borderBottomWidth: 1,
		borderBottomColor: getColor('graphite-3')
	},
	innerView: {
		padding: 20
	},
	main: {
		fontSize: 14,
		color: getColor('graphite-10')
	},
	secondary: {
		fontSize: 12,
		color: getColor('graphite-6')
	},
	tertiary: {
		fontSize: 10,
		color: getColor('graphite-4'),
		fontWeight: 'bold'
	}
});
