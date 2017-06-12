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
	Page,
	TextInput
} from '../soho/All';

import {
	AppX
} from '../gtn/All';

export default class CreateIssue extends Component {

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

	async createIssue() {
		await AppX.create({
			type: '$IssueT3',
			subject: 'Test',
			licensee: {
				memberId: '5717989018004281'
			}
		});
	}

	render() {
		return (
			<Page>
				<Card>
					<TextInput
						label='Subject'
						value={this.state.subject}
						onChangeText={(text) => this.setState({ subject: text })}
						autoCapitalize='none'
						autoFocus={true}
						required
					/>
					<TextInput
						label='Description'
						value={this.state.desc}
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

					<Button
						title='Create'
						onPress={this.createIssue}
						enabled={this.state.subject && this.state.desc}
					/>
				</Card>
				<ActivityIndicator animating={this.state.loading} size="large" />
			</Page>
		);
	}

}
