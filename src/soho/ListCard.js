import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	Text
} from 'react-native';

import Touchable from './Touchable';

import {
	getColor
} from './Tools';

export default class Card extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getViewStyle() {
		if (this.props.plain) {
			return [styles.view, {
				padding: 0,
				borderBottomWidth: 0
			}, this.props.styles];
		} else {
			return [styles.view, this.props.styles];
		}
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
				<View>
					{this.getText('main')}
					{this.getText('secondary')}
					{this.getText('tertiary')}
				</View>
			);
		}
	}

	render() {
		if (this.props.onPress) {
			return (
				<Touchable
					onPress={this.props.onPress}
					style={this.getViewStyle()}
				>
					{this.getContent()}
					{this.props.children}
				</Touchable>
			)
		} else {
			return (
				<View
					{...this.props}
					style={this.getViewStyle()}
				>
					{this.getContent()}
					{this.props.children}
				</View>
			);
		}
	}
};

const styles = StyleSheet.create({
	view: {
		padding: 20,
		backgroundColor: getColor('white-0'),
		borderBottomWidth: 1,
		borderBottomColor: getColor('graphite-3')
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
