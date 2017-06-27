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
			<Page fill>
				<Image
					style={styles.image}
					resizeMode='contain'
					source={{ uri: this.props.image }}
				/>
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		flex: 1
	}
});
