import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation';

import { } from 'react-native';

import {
	AppX
} from '../gtn/All';

import {
	Button,
	Card,
	Field,
	Loading,
	NavStyle,
	Page,
	TextInput
} from '../soho/All';

export default class CreateMessage extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		props.navigator.setTitle({ title: 'Message Editor' });
		props.navigator.setStyle(new NavStyle({ hue: 'amethyst' }));
	}

	async postMessage(event) {
		this.setState({ loading: true });

		let today = new Date();

		var body = {
			"type": "$MessageT4",
			"createdOn": today,
			"text": this.state.message,
			"issue": {
				"reference": "Issue",
				"rootType": "$IssueT3",
				"rootId": this.props.id,
				"externalType": "$IssueT3",
			},
			"licensee": {
				"memberId": "5717989018004281",
			}
		};

		var appx = await AppX.create(body);

		if (appx.data) {
			this.props.navigation.goBack();
			var page = this.props.navigation.state.params.page;
			page.reload.call(page);
		} else {
			this.setState({ loading: false });
			alert('We were\'nt able to create your message. Please try again later.');
		}
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
						primary
						title='Submit'
						onPress={this.postMessage.bind(this)}
					/>

					{this.state.loading &&
						<Loading block />
					}
				</Card>
			</Page>
		);
	}
}
