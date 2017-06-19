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
	FlatList,
} from 'react-native';

import {
	AppX
} from '../gtn/All';

import {
	Button,
	Card,
	ComplexText,
	Field,
	ListItem,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

export default class IssueDetails extends Component {

	static navigationOptions = Navigataion({
		title: (context) => {
			return context.navigation.state.params.issue.subject
		}
	});

	constructor(props) {
		super(props);

		this.state = {
			issue: this.props.navigation.state.params.issue,
			loading: true,
			attachments: null,
		};
		attachments = AppX.
	}

	async componentDidMount() {
		this.reload();
	}

	async reload() {
		this.setState({
			messages: null,
			loading: true
		});
		var data = await AppX.query('$MessageT4', 'issue.rootId = ' + this.state.issue.uid + ' ORDER BY createTimestamp DESC');
		if (data) {
			this.setState({
				messages: data.result,
				loading: false
			});
		} else {
			alert('We weren\'t able to load any messages. Please try again later!');
		}
	}

	renderItem({ item }) {
		return (
			<ListItem>
				<ComplexText
					main={item.createdBy}
					secondary={item.text}
				/>
			</ListItem>
		);
	}

	render() {
		return (
			<Page>
				<Card title='Information'>
					<Field label='Description' entry={this.state.issue.description} />
					<Field label='Status' entry={this.state.issue.status} />
					<Field label='Issue type' entry={getType(this.state.issue.issueType)} />
					<Field label='Severity' entry={getSeverity(this.state.issue.severity)} />

					{this.state.issue.assignedTo &&
						<Field label='Assigned to'>
							<ComplexText
								nopadding
								noborder
								main={this.state.issue.assignedTo.name}
								secondary={this.state.issue.assignedTo.address.addressLine1}
								tertiary={this.state.issue.assignedTo.address.city}
							/>
						</Field>
					}

					{!this.state.issue.assignedTo &&
						<Field label='Assigned to' entry='Unassigned' />
					}
				</Card>

				<Card title='Timestamps'>
					<Field label='Created by' entry={this.state.issue.createdBy} />
					<Field label='Created on' entry={this.state.issue.createdOn} />
					<Field label='Modified by' entry={this.state.issue.modifiedBy} />
					<Field label='Modified on' entry={this.state.issue.modifiedOn} />
				</Card>

				<Card title='Participants'>
					<FlatList
						data={this.state.issue.participants}
						keyExtractor={item => item.uid}
						renderItem={({ item }) => (
							<ListItem>
								<ComplexText
									main={item.party.name}
									secondary={item.party.address.addressLine1}
									tertiary={item.party.address.city}
								/>
							</ListItem>
						)}
					/>
				</Card>

				<Card>
					<Button
						title='Edit'
						onPress={() => this.props.navigation.navigate('CreateIssue', { issue: this.state.issue, page: this })}
					/>
				</Card>

				<Card title='Attachments'>
					<FlatList
						data={this.state.attachments}
						keyExtractor={item => item.uid}
						renderItem={attachment => this.renderItem(attachment)}
						/>
				</Card>

				<Card title="Messages">
					<ListItem fill>
						<Button
							title='New Message'
							onPress={() => this.props.navigation.navigate('CreateMessage', { issue: this.state.issue, page: this })}
						/>
					</ListItem>

					{this.state.loading &&
						<ActivityIndicator animating={true} size="large" />
					}

					<FlatList
						data={this.state.messages}
						keyExtractor={item => item.uid}
						renderItem={message => this.renderItem(message)}
					/>

					{(!this.state.loading && (!this.state.messages || this.state.messages.length == 0)) &&
						<ListItem>
							<ComplexText main='No messages' />
						</ListItem>
					}
				</Card>
			</Page>
		);
	}
}



function getType(level) {
	if (level == 3) {
		return 'Quality Control';
	}

	if (level == 2) {
		return 'Factory Supply';
	}

	if (level == 1) {
		return 'Shipping';
	}
}
function getSeverity(level) {
	if (level == 3) {
		return 'High';
	}

	if (level == 2) {
		return 'Medium';
	}

	if (level == 1) {
		return 'Low';
	}
}
