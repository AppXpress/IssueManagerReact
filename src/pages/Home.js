import React, { Component } from 'react';

import {
	Alert,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	StatusBar,
	Button,
	ActivityIndicator
} from 'react-native';

export default class Home extends Component {

	render() {
    	return (
    		<View>
    		</View>

    	);		
    }	

}	

const styles = StyleSheet.create({
	scroll: {
    	backgroundColor: '#F0F0F0',
    	padding: 0,
    	flexDirection: 'column'
	},
	label: {
		color: 'black',
    	fontSize: 28
	},
	inp: {
		backgroundColor: '#FFFFFF',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		alignSelf: 'stretch'
	}
});