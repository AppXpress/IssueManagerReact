import React, { Component } from 'react';

import {
	FlatList
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
	Loading,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

export default class IssueDetails extends Component {

	static navigationOptions = Navigataion({
		title: (context) => {
			return context.navigation.state.params.issue.subject
		},
		buttons: [
			{ icon: 'refresh', call: 'reload' },
			{ icon: 'edit', call: 'edit' }
		]
	});

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.navigation.state.params.issue.uid
		};
	}

	componentDidMount() {
		this.reload();
		this.props.navigation.setParams({
			page: this
		});
	}

	edit() {
		this.props.navigation.navigate('CreateIssue', { issue: this.state.issue, page: this });
	}

	reload() {
		this.setState({
			issue: null,
			actions: null,
			messages: null,
			attachments: null
		});

		AppX.fetch('$IssueT3', this.state.id, true).then(data => {
			this.setState({
				issue: data.data,
				actions: data.actionSet
			});
		});

		AppX.query('$MessageT4', 'issue.rootId = ' + this.state.id + ' ORDER BY createTimestamp DESC').then(data => {
			if (data) {
				this.setState({ messages: data.result || [] });
			} else {
				alert('We weren\'t able to load any messages. Please try again later!');
			}
		});

		AppX.fetchAttachList('$IssueT3', this.state.id).then(data => {
			if (data) {
				this.setState({ attachments: data.result || [] });
			} else {
				alert('We weren\'t able to load any attachments. Please try again later!');
			}
		});
	}


	async showAttachment(item) {

		console.log(item);
		response = await AppX.fetchAttachment(item.attachmentUid);
		console.log(response);
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
		if (!this.state.issue) {
			return (
				<Page>
					<Loading />
				</Page>
			);
		}

		return (
			<Page>
				<Card title='Details'>
					<Field.Row>
						<Field label='Subject' entry={this.state.issue.subject} />
						<Field label='Severity' entry={getSeverity(this.state.issue.severity)} />
					</Field.Row>
					<Field.Row>
						<Field label='Status' entry={this.state.issue.status} />
						<Field label='Issue type' entry={getType(this.state.issue.issueType)} />
					</Field.Row>

					<Field label='Assigned to'>
						{this.state.issue.assignedTo &&
							<ComplexText
								nopadding
								noborder
								main={this.state.issue.assignedTo.name}
								secondary={(this.state.issue.assignedTo.address || {}).addressLine1}
								tertiary={(this.state.issue.assignedTo.address || {}).city}
							/>
						}

						{!this.state.issue.assignedTo &&
							<ComplexText main='Unassigned' />
						}
					</Field>

					<Field label='Description' entry={this.state.issue.description} />
				</Card>

				<Card title='Timestamps'>
					<Field.Row>
						<Field label='Created by' entry={this.state.issue.createdBy} />
						<Field label='Created on' entry={this.state.issue.createdOn} />
					</Field.Row>
					<Field.Row>
						<Field label='Modified by' entry={this.state.issue.modifiedBy} />
						<Field label='Modified on' entry={this.state.issue.modifiedOn} />
					</Field.Row>
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

					{this.state.attachments && this.state.attachments.length == 0 &&
						<ListItem>
							<ComplexText main='No attachments' />
						</ListItem>
					}

					{!this.state.attachments &&
						<Loading />
					}
				</Card>

				<Card title="Messages">
					{this.state.messages &&
						<ListItem fill>
							<Button
								title='New Message'
								onPress={() => this.props.navigation.navigate('CreateMessage', { issue: this.state.issue, page: this })}
							/>
						</ListItem>
					}

					<FlatList
						data={this.state.messages}
						keyExtractor={item => item.uid}
						renderItem={message => this.renderItem(message)}
					/>

					{this.state.messages && this.state.messages.length == 0 &&
						<ListItem>
							<ComplexText main='No messages' />
						</ListItem>
					}

					{!this.state.messages &&
						<Loading />
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
