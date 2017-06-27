import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import {
	StyleSheet,
	View,
	Image,
	CameraRoll
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

	saveImage(){
		CameraRoll.saveToCameraRoll(this.props.image).then(()=> alert("Image saved to camera roll."));
	}

	render() {
		return (
			<Page fill>
				<Image
					style={styles.image}
					resizeMode='contain'
					source={{ uri: this.props.image }}
				/>
				<Button primary title="Save" onPress={()=>this.saveImage()} />
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		flex: 1
	}
});
