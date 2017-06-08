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

export default class Button extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	viewDisabled() {
		if (this.props.disabled) {
			return {
				opacity: 0.5
			};
		}
	}

	viewType() {
		if (this.props.primary) {
			return {
				backgroundColor: '#368ac0'
			};
		} else if (this.props.secondary) {
			return {
				backgroundColor: '#bdbdbd'
			};
		}
	}

	textType() {
		if (this.props.primary) {
			return {
				color: '#ffffff'
			};
		} else if (this.props.secondary) {
			return {
				color: '#454545'
			};
		}
	}

	getView() {
		return (
			<View
				{...this.props}
				style={[styles.view, this.viewDisabled(), this.viewType(), this.props.style]}
			>
				<Text style={[styles.text, this.textType()]}>
					{this.props.title.toUpperCase()}
				</Text>
			</View>
		);
	}

	render() {
		if (Platform.OS == 'android') {
			return (
				<TouchableNativeFeedback onPress={getHandler(this, 'onPress')}>
					{this.getView()}
				</TouchableNativeFeedback>
			);
		} else {
			return (
				<TouchableHighlight onPress={getHandler(this, 'onPress')}>
					{this.getView()}
				</TouchableHighlight>
			);
		}
	}
};

const styles = StyleSheet.create({
	view: {
		margin: 10,
		height: 34,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#5c5c5c'
	}
});
