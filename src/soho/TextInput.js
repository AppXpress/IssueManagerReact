import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput as TextInputBase
} from 'react-native';

export default class TextInput extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			leftEmpty: false,
			text: ''
		}
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

	isDisabled() {
		if (this.props.editable == false) {
			return {
				backgroundColor: '#d8d8d8'
			};
		}
	}

	setText(text) {
		if (this.props.onChangeText) {
			this.props.onChangeText(text);
		}
		this.setState({ text: text });
	}

	render() {
		return (
			<View style={styles.view}>
				{this.getLabel()}
				<TextInputBase
					{...this.props }
					style={[styles.text, this.isDisabled(), this.props.style]}
					underlineColorAndroid='transparent'
					onChangeText={(text) => this.setText(text)}
					onBlur={() => this.setState({ blurred: true })}
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
		color: '#5c5c5c'
	},
	text: {
		height: 34,
		borderRadius: 2,
		fontSize: 14,
		padding: 0,
		paddingLeft: 10,
		color: '#1a1a1a',
		borderWidth: 1,
		borderColor: '#999999'
	},
	error: {
		color: '#e84f4f'
	}
});
