import React, { Component } from 'react';

import {
	Alert,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	ActivityIndicator,
	AsyncStorage,
	ListView,
	Picker,
} from 'react-native';

import {
	Button,
	Card,
	ListCard,
	Navigataion,
	TextInput
} from '../soho/All';

export default class Create extends Component {

	static navigationOptions = Navigataion({
		title: 'New Issue',
		hue: 'ruby'
	});

	constructor(props) {
		super(props);

		this.state = {
			subject: '',
			issueType: '',
			severity: '',
			desc: '',
			loading: false,
		};
	}

	render() {
		return (
			<ScrollView style={styles.scroll}>
				<Card>
					<TextInput
						label='Subject'
						onChangeText={(text) => this.setState({ subject: text })}
						autoCapitalize='none'
						autoFocus={true}
						required
					/>
					<TextInput
						label='Description'
						onChangeText={(text) => this.setState({ desc: text })}
						autoCapitalize='none'
						required
					/>
					<Picker
						selectedValue={this.state.issueType}
						onValueChange={(item, index) => this.setState({ issueType: item })}>
						<Picker.Item label="Shipping" value="Shipping" />
						<Picker.Item label="Factory" value="Factory" />
						<Picker.Item label="Quality Control" value="Quality Control" />
					</Picker>
					<Picker
						selectedValue={this.state.severity}
						onValueChange={(item, index) => this.setState({ severity: item })}>
						<Picker.Item label="Low" value="Low" />
						<Picker.Item label="Medium" value="Medium" />
						<Picker.Item label="High" value="High" />
					</Picker>
				</Card>
				<ActivityIndicator animating={this.state.loading} size="large" />
			</ScrollView>
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
