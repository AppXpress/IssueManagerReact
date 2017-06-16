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
	ListView
} from 'react-native';

import {
	Button,
	Card,
	Navigataion,
	Page,
	Picker,
	TextInput
} from '../soho/All';

import {
	AppX,
	OrgPicker
} from '../gtn/All';

import {
	IssueList
} from './IssueList.js';

export default class CreateIssue extends Component {

	static navigationOptions = Navigataion({
		title: 'New Issue',
		hue: 'ruby'
	});

	constructor(props) {
		super(props);

		this.state = {
			subject: '',
			description: '',
			issueType: '0',
			severity: '0',
		};
	}

	async createIssue() {
		var data = {
			type: '$IssueT3',
			subject: this.state.subject,
			licensee: {
				memberId: '5717989018004281'
			},
			issueType: this.state.issueType,
			severity: this.state.severity,
			description: this.state.description,
		};

		if (this.state.assignedTo) {
			data.assignedTo = {
				memberId: this.state.assignedTo
			};
		}

		await AppX.create(data);

		this.props.navigation.goBack();
		var params = this.props.navigation.state.params;
		params.page.reload.call(params.page);
	}

	render() {
		return (
			<Page>
				<Card>
					<TextInput
						label='Subject'
						value={this.state.subject}
						onChangeText={(text) => this.setState({ subject: text })}
					/>
					<TextInput
						label='Description'
						value={this.state.description}
						onChangeText={(text) => this.setState({ description: text })}
					/>
					<Picker
						label='Issue Type'
						title='Select an issue type'
						selectedValue={this.state.issueType}
						onValueChange={(item, index) => this.setState({ issueType: item })}
					>
						<Picker.Item label="Shipping" value='1' />
						<Picker.Item label="Factory Supply" value='2' />
						<Picker.Item label="Quality Control" value='3' />
					</Picker>
					<Picker
						label='Severity'
						title='Select a severity'
						selectedValue={this.state.severity}
						onValueChange={(item, index) => this.setState({ severity: item })}
					>
						<Picker.Item label="Low" value="1" />
						<Picker.Item label="Medium" value="2" />
						<Picker.Item label="High" value="3" />
					</Picker>

					<OrgPicker
						label='Assigned to'
						selectedValue={this.state.assignedTo}
						onValueChange={(item, index) => this.setState({ assignedTo: item })}
					/>

					<Button
						primary
						hue='ruby'
						title='Create'
						onPress={() => this.createIssue()}
					/>
				</Card>
			</Page>
		);
	}
}
