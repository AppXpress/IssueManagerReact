import React, { Component } from 'react';

import {
	StyleSheet,
	ScrollView
} from 'react-native';

import {
	getColor
} from './Tools';

export default class Page extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return (
			<ScrollView style={styles.scroll}>
				{this.props.children}
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	scroll: {
		padding: 0,
		backgroundColor: getColor('graphite-1'),
		flexDirection: 'column'
	}
});
