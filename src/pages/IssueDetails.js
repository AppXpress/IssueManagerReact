import React, { Component } from 'react';

import {
	FlatList,
	View
} from 'react-native';

import {
	AppX,
	UserPicker,
} from '../gtn/All';

import {
	Button,
	Card,
	ComplexText,
	Field,
	ListItem,
	Loading,
	Modal,
	Navigation,
	Page,
	TextInput
} from '../soho/All';

/**
 * Page component for viewing a singular issue
 */
export default class IssueDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		Navigation.bind(this);

		Navigation.set(this, {
			title: 'Details',
			hue: 'slate',
			buttons: [
				{ icon: 'refresh', id: 'reload' }
			]
		});
	}

	componentDidMount() {
		this.reload();
	}

	/**
	 * Resets the navigation appearance when the page is viewed
	 */
	willAppear() {
		this.setNavigation();
	}

	/**
	 * Opens the modal for vieiwng and running actions
	 */
	action() {
		this.setState({ pickAction: true });
	}

	/**
	 * Runs a workflow action, or if selected, opens user picker
	 * 
	 * @param {string} action 
	 */
	runAction(action) {
		if (action == 'wf_setOwnership') {
			this.setState({
				pickAction: false,
				acting: false,
				ownerModalVisible: true
			});
			return;
		}

		this.setState({
			pickAction: false,
			acting: true
		});

		AppX.action(this.state.issue, action).then(appx => {
			this.setState({ acting: false });

			if (appx.data) {
				this.reload();
			} else {
				if (typeof appx.error == 'string') {
					alert(appx.error);
				} else {
					alert('We were unable to perform the select action. Please try again later.');
				}
			}
		});
	}

	/**
	 * Sets the new owner on an assigned issue
	 */
	changeOwner() {
		this.setState({ ownerModalVisible: false, acting: true });
		this.state.issue.owner = this.state.owner;

		AppX.persist(this.state.issue).then(({ data }) => {
			if (data) {
				this.reload();
			} else {
				alert('We were unable to perform the select action. Please try again later.');
			}
			this.setState({ acting: false });
		});
	}

	/**
	 * Opens the issue editing page with the current issue
	 */
	edit() {
		this.props.navigator.push({
			screen: 'CreateIssue',
			passProps: { issue: this.state.issue, reload: () => this.reload() }
		});
	}

	/**
	 * Styles the navigation based on the issue properties and actions available
	 */
	setNavigation() {
		var nav = {
			title: 'Details',
			buttons: [
				{ icon: 'refresh', id: 'reload' },
				{ icon: 'launch', id: 'action' }
			]
		};
		if (this.state.issue) {
			switch (this.state.issue.severity) {
				case '1':
					nav.hue = 'emerald';
					break;
				case '2':
					nav.hue = 'amber';
					break;
				case '3':
					nav.hue = 'ruby';
					break;
				default:
					nav.hue = 'slate';
			}
			if (this.state.editable) {
				nav.buttons.push({ icon: 'edit', id: 'edit' });
			}
		}
		Navigation.set(this, nav);
	}

	async showAttachment(item) {
		console.log(item);
		var appx = await AppX.fetchAttachment(item.attachmentUid);
		console.log(appx);
	}

	/**
	 * Loads the issue, its messages, and attachments from the REST API
	 */
	reload() {
		this.setState({
			issue: null,
			actions: null,
			messages: null,
			attachments: null,
			editable: false,
			historyShown: false,
			historyButton: 'Show',
			ownerModalVisible: false,
		});

		/* Get the current issue */
		AppX.fetch('$IssueT3', this.props.id, true).then(({ data }) => {
			this.setState({
				issue: data.data,
				actions: data.actionSet.action.filter(action => {
					return action.startsWith('wf_');
				}),
				editable: data.actionSet.action.indexOf('modify') > -1
			});

			if (this.state.actions.indexOf('wf_takeOwnership') > -1) {
				var newActions = this.state.actions;
				newActions.push('wf_setOwnership');
				this.setState({ actions: newActions });
			}

			this.setNavigation();
		});

		/* Get the issue messages */
		AppX.query('$MessageT4', 'issue.rootId = ' + this.props.id + ' ORDER BY createTimestamp DESC').then(({ data }) => {
			if (data) {
				this.setState({ messages: data.result || [] });
			} else {
				alert('We weren\'t able to load any messages. Please try again later!');
			}
		});

		/* Get the attachments on the issue */
		AppX.fetchAttachList('$IssueT3', this.props.id).then(({ data }) => {
			if (data) {
				this.setState({ attachments: data.result || [] });
			} else {
				alert('We weren\'t able to load any attachments. Please try again later!');
			}
		});
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

				<Field.Row>
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
					<Field label='Owner' entry={this.state.issue.owner} />
				</Field.Row>

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

							onPress={() => this.props.navigator.push({
								screen: 'CreateMessage',
								passProps: {
									id: this.props.id, reload: () => this.reload()
								}
							})}

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
							<ListItem onPress={() => this.runAction(item)}>
								<ComplexText main={formatAction(item)} />
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

	renderHistory() {
		return (
			<Card title="History" >
				<Button
					title={this.state.historyShown ? 'Hide' : 'Show'}
					onPress={() => this.setState({ historyShown: !this.state.historyShown })}
				/>
				{this.state.historyShown &&
					<FlatList
						data={this.state.issue.history}
						keyExtractor={item => item.uid}
						renderItem={({ item }) => (
							<ListItem>
								<ComplexText
									main={item.newState}
									secondary={item.modifiedByOrg.name}
									tertiary={item.modifiedDate}
								/>
							</ListItem>
						)}
					/>
				}
			</Card>
		);
	}

	renderOwnerModal() {
		return (
			<View>
				<Modal visible={this.state.ownerModalVisible}
					title='Select an Owner'
					onClose={() => this.setState({ ownerModalVisible: false })}
					onSubmit={() => this.changeOwner()}
				>
					<UserPicker
						selectedValue={this.state.owner}
						onValueChange={(item, index) => this.setState({ owner: item })}
					/>
				</Modal>
			</View>
		);
	}

	/**
	 * Renders each page component, or a loader if the issue is not available
	 */
	render() {
		if (!this.state.issue) {
			return (
				<Page>
					<Loading />
				</Page>
			);
		} else {
			return (
				<Page>
					{this.renderDetails()}
					{this.renderTimestamps()}
					{this.renderParticipants()}
					{this.renderAttachments()}
					{this.renderMessages()}
					{this.renderActions()}
					{this.renderHistory()}
					{this.renderOwnerModal()}
				</Page>
			);
		}
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

function formatAction(name) {
	return name.charAt(3).toUpperCase() + name.substring(4).replace(/([A-Z])/g, ' $1').trim();
}
