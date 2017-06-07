import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableHighlight,
	View,
	Text
} from 'react-native';

export default class Card extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getMain() {
		if (this.props.main) {
			return (
				<Text style={styles.main}>
					{this.props.main}
				</Text>
			);
		}
	}

	getSecondary() {
		if (this.props.secondary) {
			return (
				<Text style={styles.secondary}>
					{this.props.secondary}
				</Text>
			);
		}
	}

	getTertiary() {
		if (this.props.tertiary) {
			return (
				<Text style={styles.tertiary}>
					{this.props.tertiary}
				</Text>
			);
		}
	}

	getButton() {
		if (Platform.OS == 'android') {
			return (
				<TouchableNativeFeedback
					onPress={this.props.onPress}
				>
					{this.getView()}
				</TouchableNativeFeedback>
			);
		}
		return (
			<TouchableHighlight
				onPress={this.props.onPress}
			>
				{this.getView()}
			</TouchableHighlight>
		);
	}

	getView() {
		return (
			<View style={styles.view}>
				{this.getMain()}
				{this.getSecondary()}
				{this.getTertiary()}
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
