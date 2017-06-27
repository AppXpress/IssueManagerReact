import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import {
	StyleSheet,
	View,
	Image
} from 'react-native';

import {
	AppX
} from '../gtn/All';

import {
	Button,
	Card,
	Field,
	List,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';


export default class ImageDisplay extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.view}>
				<Image
					style={styles.image}
					source={{ url: this.props.image }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignContents: 'stretch'
	},
	image: {
		flex: 1
	}
});
