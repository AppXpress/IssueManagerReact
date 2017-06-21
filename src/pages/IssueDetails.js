import React, { Component } from 'react';

import {
	FlatList,
	View
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
	Modal,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

export default class IssueDetails extends Component {

	static navigationOptions = Navigataion({
		title: function () {
			return this.state.issue ? this.state.issue.subject : ''
		},
		buttons: function () {
			return [
				<Button icon='refresh' onPress={() => this.reload()} key={1} />,
				this.state && this.state.editable ? <Button icon='edit' onPress={() => this.edit()} key={2} /> : null,
				<Button icon='duplicate' onPress={() => this.pickAction()} key={3} />
			];
		}
	});

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.navigation.state.params.id
		};
	}

	componentDidMount() {
		this.reload();
	}

	pickAction() {
		this.setState({ pickAction: true });
	}

	action(action) {
		this.setState({
			pickAction: false,
			acting: true
		});

		AppX.action(this.state.issue, action).then(appx => {
			this.setState({ acting: false });

			if (!appx.data) {
				if (appx.error.message) {
					alert(appx.error.message);
				} else {
					alert('We were unable to perform the select action. Please try again later.');
				}
			}

			this.reload();
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
			attachments: null,
			editable: false
		});

		AppX.fetch('$IssueT3', this.state.id, true).then(({ data }) => {
			this.setState({
				issue: data.data,
				actions: data.actionSet.action.filter(action => {
					return action.startsWith('wf_');
				}),
				editable: data.actionSet.action.indexOf('modify') > -1
			});

			this.props.navigation.setParams({
				page: this
			});
		});

		AppX.query('$MessageT4', 'issue.rootId = ' + this.state.id + ' ORDER BY createTimestamp DESC').then(({ data }) => {
			if (data) {
				this.setState({ messages: data.result || [] });
			} else {
				alert('We weren\'t able to load any messages. Please try again later!');
			}
		});

		AppX.fetchAttachList('$IssueT3', this.state.id).then(({ data }) => {
			if (data) {
				this.setState({ attachments: data.result || [] });
			} else {
				alert('We weren\'t able to load any attachments. Please try again later!');
			}
		});
	}


	async showAttachment(item) {

		console.log(item);
		var appx = await AppX.fetchAttachment(item.attachmentUid);
		console.log(appx);
	}

	renderDetails() {
		return (
			<Card title='Details'>
				<Field.Row>
					<Field label='Subject' entry={this.state.issue.subject} />
					<Field label='Severity' entry={getSeverity(this.state.issue.severity)} />
				</Field.Row>
				<Field.Row>
					<Field label='Status' entry={this.state.issue.status.charAt(0).toUpperCase() + this.state.issue.status.substring(1)} />
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
		);
	}

	renderTimestamps() {
		return (
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
		);
	}

	renderParticipants() {
		return (
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
		);
	}

	renderAttachments() {
		return (
			<Card title='Attachments'>
				<FlatList
					data={this.state.attachments}
					keyExtractor={item => item.attachmentUid}
					renderItem={({ item }) => (
						<ListItem onPress={() => this.showAttachment(item)} >
							<ComplexText
								main={item.name}
								secondary={item.description}
							/>
						</ListItem>
					)}
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
		);
	}

	renderMessages() {
		return (
			<Card title="Messages">
				{this.state.messages &&
					<ListItem fill>
						<Button
							icon='mingle-share'
							title='New Message'
							onPress={() => this.props.navigation.navigate('CreateMessage', { issue: this.state.issue, page: this })}
						/>
					</ListItem>
				}

				<FlatList
					data={this.state.messages}
					keyExtractor={item => item.uid}
					renderItem={({ item }) => (
						<ListItem>
							<ComplexText
								main={item.createdBy}
								secondary={item.text}
							/>
						</ListItem>
					)}
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
		);
	}

	renderActions() {
		return (
			<View>
				<Modal
					title='Actions'
					visible={this.state.pickAction}
					onClose={() => this.setState({ pickAction: false })}
					onRequestClose={() => this.setState({ pickAction: false })}
				>
					<FlatList
						data={this.state.actions}
						keyExtractor={item => item}
						renderItem={({ item }) => (
							<ListItem onPress={() => this.action(item)}>
								<ComplexText main={item.charAt(3).toUpperCase() + item.substring(4)} />
							</ListItem>
						)}
					/>

					{this.state.actions && this.state.actions.length == 0 &&
						<ListItem>
							<ComplexText main='No actions' />
						</ListItem>
					}
				</Modal>

				{this.state.acting &&
					<Loading block />
				}
			</View>
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
				{this.renderDetails()}
				{this.renderTimestamps()}
				{this.renderParticipants()}
				{this.renderAttachments()}
				{this.renderMessages()}
				{this.renderActions()}
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
