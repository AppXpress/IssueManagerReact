import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableHighlight,
	View,
	ListView,
	Text
} from 'react-native';

import {
	getHandler,
	getColor
} from './Tools';

export default class Field extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	getItem(entry) {
		return (
			<Text style={styles.entry} key={entry}>
				{entry}
			</Text>
		);
	}

	getContent() {
		if (this.props.entry) {
			if (typeof this.props.entry == 'object') {
				return this.props.entry.map(this.getItem);
			} else {
				return this.getItem(this.props.entry);
			}
		}
	}

	render() {
		return (
			<View style={styles.view}>
				<Text style={styles.label}>
					{this.props.label}
				</Text>
				{this.getContent()}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		padding: 10
	},
	label: {
		fontSize: 12,
		color: getColor('graphite-6')
	},
	entry: {
		fontSize: 14,
		color: getColor('graphite-10')
	}
});
