import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Picker as PickerBase
} from 'react-native';

import {
	getHandler,
	getColor
} from './Tools';

export default class Picker extends Component {
	static Item = PickerBase.Item;

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			value: null
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ value: next.selectedValue });
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

	onValueChange(value) {
		this.setState({ value: value })
	}

	render() {
		return (
			<View style={styles.view}>
				{this.getLabel()}
				<View style={styles.innerView}>
					<PickerBase
						{...this.props}
						label='Test'
						style={styles.picker}
						selectedValue={this.state.value}
						onValueChange={getHandler(this, 'onValueChange')}
					>
						{this.props.children}
					</PickerBase>
				</View>
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
	innerView: {
		borderRadius: 2,
		borderWidth: 1,
		borderColor: getColor('graphite-4')
	},
	picker: {
		height: 34,
		padding: 0,
		paddingLeft: 10,
		color: getColor('graphite-10')
	}
});
