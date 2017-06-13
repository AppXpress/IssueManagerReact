import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableHighlight,
	View
} from 'react-native';

import {
	getHandler,
	getColor
} from './Tools';

export default class Touchable extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		if (Platform.OS == 'android') {
			return (
				<TouchableNativeFeedback
					{...this.props}
					style={null}
					background={TouchableNativeFeedback.Ripple(
						'rgba(0, 0, 0, 0.32)',
						this.props.borderless
					)}
				>
					<View style={this.props.style}>
						{this.props.children}
					</View>
				</TouchableNativeFeedback>
			);
		} else {
			return (
				<TouchableHighlight
					{...this.props}
					style={null}
				>
					<View style={this.props.style}>
						{this.props.children}
					</View>
				</TouchableHighlight>
			);
		}
	}
};
