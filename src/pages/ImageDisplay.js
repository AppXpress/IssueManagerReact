import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import {
	Alert,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	AsyncStorage,
	ListView,
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
		this.state = {
			root: this.props.image,
		}
		console.log(this.state.root);

	}

	render() {
		return (
			<View>
				<Image
					style={{ width: 50, height: 50 }}
					source={this.state.root}
				/>
			</View>
		);
	}
}
