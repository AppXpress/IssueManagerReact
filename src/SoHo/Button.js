import React, { Component } from 'react';

import {
	StyleSheet,
	TouchableNativeFeedback,
	View,
	Text,
	Image
} from 'react-native';

export default class Button extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	viewDisable() {
		if (this.props.disabled) {
			return [
				styles.view,
				{ opacity: 0.5 }
			];
		}
		return styles.view;
	}

	viewStyles() {
		if (this.props.primary) {
			return [
				this.viewDisable(),
				{ backgroundColor: '#368ac0' }
			]
		} else if (this.props.secondary) {
			return [
				this.viewDisable(),
				{ backgroundColor: '#bdbdbd' }
			]
		}
		return this.viewDisable();
	}

	textStyles() {
		if (this.props.primary) {
			return [
				styles.text,
				{ color: '#ffffff' }
			]
		} else if (this.props.secondary) {
			return [
				styles.text,
				{ color: '#454545' }
			]
		}
		return styles.text;
	}

	render() {
		return (
			<TouchableNativeFeedback onPress={this.props.onPress} disabled={this.props.disabled}>
				<View style={this.viewStyles()}>
					<Text style={this.textStyles()}>{this.props.title.toUpperCase()}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		height: 34,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 12,
		color: '#5c5c5c'
	},
	image: {
		width: 5,
		height: 5
	}
});
