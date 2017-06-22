import React, { Component } from 'react';

import {
	StyleSheet,
	ScrollView
} from 'react-native';

import {
	getColor
} from './Tools';

/**
 * A page component in SoHo style
 */
export default class Page extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	/**
	 * Renders a styled scroll view wrapper for pages
	 */
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
		flexDirection: 'column',
		backgroundColor: getColor('graphite-1')
	}
});
