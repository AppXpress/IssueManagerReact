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

export default class Button extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getViewStyle() {
		var style = [styles.view];

		if (this.props.primary) {
			style.push({
				backgroundColor: getColor(this.props.hue + '-6', 'azure-6')
			});
		} else if (this.props.secondary) {
			style.push({
				backgroundColor: getColor('graphite-3')
			});
		}

		if (this.props.enabled == false) {
			style.push({
				opacity: 0.5
			});
		}

		return style;
	}

	getTextStyle() {
		var style = [styles.text];

		if (this.props.primary) {
			style.push({
				color: getColor('white-0')
			});
		} else if (this.props.secondary) {
			style.push({
				color: getColor(this.props.hue + '-7', 'graphite-7')
			});
		}

		return style;
	}

	getView() {
		return (
			<View style={this.getViewStyle()}>
				<Text style={this.getTextStyle()}>
					{this.props.title.toUpperCase()}
				</Text>
			</View>
		);
	}

	render() {
		if (Platform.OS == 'android') {
			return (
				<TouchableNativeFeedback
					{...this.props}
					onPress={getHandler(this, 'onPress')}
					style={{}}
				>
					{this.getView()}
				</TouchableNativeFeedback>
			);
		} else {
			return (
				<TouchableHighlight
					{...this.props}
					onPress={getHandler(this, 'onPress')}
					style={{}}
				>
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
		color: getColor('graphite-6')
	}
});
