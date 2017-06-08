import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Switch as SwitchBase,
	Text
} from 'react-native';

import {
	getHandler
} from './Tools';

export default class Switch extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			value: false
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ value: next.value });
	}

	onValueChange(value) {
		this.setState({ value: value })
	}

	thumbColor() {
		if (this.state.value) {
			return '#368ac0';
		}
		return '#ffffff';
	}

	render() {
		return (
			<View
				{...this.props}
				style={styles.view}
			>
				<SwitchBase
					style={styles.switch}
					tintColor='#999999'
					onTintColor='#8dc9e6'
					thumbTintColor={this.thumbColor()}
					onValueChange={getHandler(this, 'onValueChange')}
					value={this.state.value}
				/>
				<Text style={styles.label}>
					{this.props.label}
				</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		margin: 10,
		flexDirection: 'row'
	},
	switch: {
	},
	title: {
		paddingTop: 3,
		paddingLeft: 10,
		fontSize: 14,
		color: '#1a1a1a'
	}
});
