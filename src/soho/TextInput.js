import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput as TextInputBase
} from 'react-native';

import {
	getHandler,
	getColor
} from './Tools';

export default class TextInput extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			leftEmpty: false,
			text: ''
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ text: next.value });
	}

	getLabel() {
		if (this.props.label) {
			return (
				<Text style={styles.label}>
					{this.props.label}
					{this.props.required && (
						<Text style={styles.error}>*</Text>
					)}
				</Text>
			);
		}
	}

	getError() {
		if (this.props.required) {
			if (this.state.blurred && !this.state.text) {
				return (
					<Text style={styles.error}>This field is required</Text>
				);
			}
		}
	}

	onChangeText(text) {
		this.setState({ text: text });
	}

	onFocus() {
		this.setState({ blurred: false });
	}

	onBlur() {
		this.setState({ blurred: true });
	}

	getTextStyle() {
		var style = [styles.text];

		if (this.props.editable == false) {
			style.push({
				backgroundColor: getColor('graphite-2')
			});
		}

		return style;
	}

	render() {
		return (
			<View style={styles.view}>
				{this.getLabel()}
				<TextInputBase
					{...this.props}
					style={this.getTextStyle()}
					underlineColorAndroid='transparent'
					onFocus={getHandler(this, 'onFocus')}
					onBlur={getHandler(this, 'onBlur')}
					onChangeText={getHandler(this, 'onChangeText')}
					value={this.props.value}
				/>
				{this.getError()}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		margin: 10,
	},
	label: {
		fontSize: 12,
		color: getColor('graphite-6')
	},
	text: {
		height: 34,
		borderRadius: 2,
		fontSize: 14,
		padding: 0,
		paddingLeft: 10,
		color: getColor('graphite-10'),
		borderWidth: 1,
		borderColor: getColor('graphite-4')
	},
	error: {
		color: getColor('alert-1')
	}
});
