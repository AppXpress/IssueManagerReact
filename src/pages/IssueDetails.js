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
		},
		right: ({ navigation }) => {
			return (
				<Button
					icon='edit'
					onPress={() => navigation.state.params.page.edit.call(navigation.state.params.page)}
				/>
			);
		}
	});

	constructor(props) {
		super(props);

		this.state = {
			issue: this.props.navigation.state.params.issue,
			loading: true,
			attachments: null,
		};
	}

	async componentDidMount() {
		this.reload();
		this.props.navigation.setParams({
			page: this
		});
	}

	async reload() {
		var issue = await AppX.fetch('$IssueT3', this.state.issue.uid);
		for (var prop in issue) {
			this.state.issue[prop] = issue[prop];
		}

		this.setState({
			messages: null,
			loading: true,
			attachments: null,
		});
		var data = await AppX.query('$MessageT4', 'issue.rootId = ' + this.state.issue.uid + ' ORDER BY createTimestamp DESC');

		var attachments = await AppX.fetchAttachList('$IssueT3', this.state.issue.uid);

		if (data && attachments) {
			this.setState({
				messages: data.result,
				loading: false,
				attachments: attachments.result
			});
		} else if (!data) {
			alert('We weren\'t able to load any messages. Please try again later!');
		} else {
			alert('We weren\'t able to load any attachments. Please try again later!');
		}
		console.log(attachments);
	}


	async showAttachment(item) {

		console.log(item);
		response = await AppX.fetchAttachment(item.attachmentUid);
		console.log(response);
	}


	edit() {
		this.props.navigation.navigate('CreateIssue', { issue: this.state.issue, page: this })

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
	renderAttach({ item }) {

		return (
			<ListItem onPress={() => this.showAttachment(item)} >
				<ComplexText
					main={item.name}
					secondary={item.description}
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
								secondary={(this.state.issue.assignedTo.address || {}).addressLine1}
								tertiary={(this.state.issue.assignedTo.address || {}).city}
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

				<Card title='Attachments'>

					<FlatList
						data={this.state.attachments}
						keyExtractor={item => item.attachmentUid}
						renderItem={attachment => this.renderAttach(attachment)}
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
