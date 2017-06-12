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
} from 'react-native';

import {
	AppX
} from '../gtn/All';

import {
	Button,
	Card,
	Field,
	List,
	ListCard,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

export default class CreateMessage extends Component {

	static navigationOptions = Navigataion({
		title: 'New Message',
	});

	constructor(props) {
		super(props);

		this.state = {
			message: '',
			root: this.props.navigation.state.params.issue,

		};
	}

	render() {
		return (
			<Page>
				<Card>
					<TextInput
						label='Message Text'
						onChangeText={(text) => this.setState({ message: text })}
						multiline
						rows={5}
					/>

					<Button
						title='Save'
						onPress={this.postMessage.bind(this)}
						primary
					/>
				</Card>
			</Page>
		);
	}

	postMessage(event) {
		let today = new Date();

		var body = {
			"type": "$MessageT4",
			"createdOn": today,
			"text": this.state.message,
			"issue": {
				"reference": "Issue",
				"rootType": "$IssueT3",
				"rootId": this.state.root.uid,
				"externalType": "$IssueT3",
			},
			"licensee": {
				"memberId": "5717989018004281",
			}
		}
		AppX.create('$MessageT4', body);

		this.props.navigation.navigate('IssueDetails', { issue: this.state.root });
	}
}
