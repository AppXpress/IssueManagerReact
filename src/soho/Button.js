import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	Text
} from 'react-native';

import Icon from './Icon';
import Touchable from './Touchable';

import {
	getColor
} from './Tools';

export default class Button extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getTouchableStyle() {
		var style = {};

		if (this.props.primary) {
			style.backgroundColor = getColor(this.props.hue + '-6', 'azure-6');
		} else if (this.props.secondary) {
			style.backgroundColor = getColor('graphite-3');
		} else if (this.props.icon && !this.props.title) {
			style.height = 24;
			style.width = 48;
		}

		if (this.props.disabled) {
			style.opacity = 0.5;
		}

		return [styles.touchable, style];
	}

	getTextStyle() {
		var style = {};

		if (this.props.primary) {
			style.color = getColor('white-0');
		} else if (this.props.secondary) {
			style.color = getColor(this.props.hue + '-7', 'graphite-7');
		} else if (this.props.icon && !this.props.title) {
			style.fontSize = 24;
			style.fontWeight = 'normal';
			style.color = getColor('white-0');
		} else {
			style.color = getColor(this.props.hue + '-6', 'graphite-6');
		}

		return [styles.text, style];
	}

	render() {
		return (
			<View style={styles.view}>
				<Touchable
					disabled={this.props.disabled}
					style={this.getTouchableStyle()}
					onPress={this.props.onPress}
					borderless={this.props.icon && !this.props.title}
				>
					<Text style={this.getTextStyle()}>
						{this.props.icon &&
							<Icon name={this.props.icon} />
						}
						{(this.props.title || '').toUpperCase()}
					</Text>
					{this.props.children}
				</Touchable>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		margin: 10
	},
	touchable: {
		height: 34,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 12,
		fontWeight: 'bold'
	}
});
