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
	query
} from '../RestMethods';

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

export default class IssueDetails extends Component {

	static navigationOptions = Navigataion({
		title: (context) => {
			return context.navigation.state.params.issue.subject
		}
	});

	constructor(props) {
		super(props);

		this.state = {
			messageList: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			issue: this.props.navigation.state.params.issue,
			loading: true,
		};


	}
	renderRow(message) {
		return (
			<View>
				<ListCard main={message.createdBy} secondary={message.text}

				></ListCard>
			</View>
		)
	}

	async componentDidMount() {
		var data = await this.getComments();

		if (!data.result) {
			this.setState({
				messageList: false,
				loading: false,
			});
			console.log(data);
			return;
		}
		console.log(data);
		this.setState({
			messageList: this.state.messageList.cloneWithRows(data.result),
			loading: false,
		});
	}

	async getComments() {
		return await query('$MessageT4', 'issue.rootId = ' + this.state.issue.uid);
	}


	render() {
		return (
			<Page>
				<Card>
					<Field label='Created by' entry={this.state.issue.createdBy} />
					<Field label='Created on' entry={this.state.issue.createdOn} />
				</Card>

				<Card>
					<Field label='Description' entry={this.state.issue.description} />
					<Field label='Status' entry={this.state.issue.status} />
					<Field label='Issue type' entry={this.state.issue.issueType} />
					<Field label='Severity' entry={this.state.issue.severity} />
				</Card>

				<Card>
					<Field label='Assigned to' entry={this.getAssignedTo()} />
				</Card>

				{this.state.loading &&
					<ActivityIndicator animating={true} size="large" />
				}

				{this.state.messageList && !this.state.loading &&
					<Card title='Messages'>
						<ListView
							dataSource={this.state.messageList}
							renderRow={this.renderRow.bind(this)}
							enableEmptySections={true}
						/>
					</Card>
				}

				{!this.state.messageList && !this.state.loading &&
					<Card>
						<Field entry='No messages' />
					</Card>
				}
			</Page>
		);
	}

	getAssignedTo() {
		if (this.state.issue.participants[1]) {
			return this.state.issue.participants[1].party.name;
		} else {
			return 'Unassigned';
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

const styles = {}
