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

		console.log(this.props.issue)

		this.test()

		this.state = {
			subject: '',
			description: '',
			issueType: '0',
			severity: '0',
		};
	}

	async test() {
		console.log(await AppX.fetch('$IssueT3', '95920847'));
	}

	async persist() {
		var issue = {};
		if (this.props.issue) {
			issue = this.props.issue;
		} else {
			issue.type = '$IssueT3';
			issue.licensee = {
				memberId: '5717989018004281'
			};
		}

		issue.subject = this.state.subject;
		issue.issueType = this.state.issueType;
		issue.severity = this.state.severity;
		issue.description = this.state.description;
		issue.assignedTo = { memberId: this.state.assignedTo };

		if (!this.state.assignedTo) {
			delete issue.assignedTo;
		}

		var response;
		if (this.props.issue) {
			response = await AppX.persist(issue);
		} else {
			response = await AppX.create(issue);
		}

		if (response) {
			this.props.navigation.goBack();
			var params = this.props.navigation.state.params;
			params.page.reload.call(params.page);
		} else {
			alert('Something went wrong!');
		}
	}

	async create() {
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
						title={this.props.issue ? 'Update' : 'Create'}
						onPress={() => this.persist()}
					/>
				</Card>
			</Page>
		);
	}
}
