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
	ListItem,
	Loading,
	Navigataion,
	Page,
	TextInput,
	Modal,
	Picker,
} from '../soho/All';

export default class IssueList extends Component {

	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			searchtext: '',
			modalVisible: false,
			filterBy: 'subject',
			severityFilter: null,
			typeFilter: null,
			daysFilter: null,
			statusFilter: null,
		};
	}

	static navigationOptions = Navigataion({
		title: 'Issue List',
		buttons: function () {
			return [
				<Button icon='refresh' onPress={() => this.reload()} key={1} />,
				<Button icon='add' onPress={() => this.create()} key={2} />
			];
		}
	});

	componentDidMount() {
		this.reload();
		this.props.navigation.setParams({
			page: this
		});
	}

	create() {
		this.props.navigation.navigate('CreateIssue', { page: this });
	}

	async reload() {
		this.setState({
			issues: null,
			loading: true
		});

		var data = await AppX.query('$IssueT3', 'ORDER BY modifyTimestamp DESC');
		if (data) {
		var appx = await AppX.query('$IssueT3', 'ORDER BY modifyTimestamp DESC');
		if (appx.data) {
			this.setState({
				fullIssues: data.result,
				issues: data.result,
				fullIssues: appx.data.result,
				issues: appx.data.result,
				loading: false
			});
		} else {
			alert('We weren\'t able to load any issues. Please try again later!');
		}
	}

	async requery() {
		this.setState({
			issues: null,
			loading: true
		});

		if (this.state.severityFilter) {

		}

		var oqlStmnt = this.state.filterBy + ' contains ' + '\'' + this.state.searchtext + '\'';

		if (this.state.severityFilter) {
			oqlStmnt += " AND severity = \'" + this.state.severityFilter + "\'";
		}

		if (this.state.typeFilter) {
			oqlStmnt += " AND type = \'" + this.state.typeFilter + "\'";
		}
		if (this.state.daysFilter) {
			oqlStmnt += " AND createdOn In @(Last " + this.state.daysFilter + " Days)"
		}
		if (this.state.statusFilter) {
			oqlStmnt += " AND status = \'" + this.state.statusFilter + "\'";
		}

		oqlStmnt += " ORDER BY modifyTimestamp DESC";
		console.log(oqlStmnt);
		var data = await AppX.query('$IssueT3', oqlStmnt);
		if (data) {
		var appx = await AppX.query('$IssueT3', oqlStmnt);
		if (appx.data) {
			this.setState({
				fullIssues: data.result,
				issues: data.result,
				fullIssues: appx.data.result,
				issues: appx.data.result,
				loading: false
			});
		} else {
			alert('We weren\'t able to load any issues. Please try again later!');
		}
	}

	setSearchText(event) {
		let searchText = event;
		this.setState({ searchtext: searchText });

		let filteredData = this.filterIssues(searchText, this.state.fullIssues);
		this.setState({ issues: filteredData });
	}

	filterIssues(searchText, issueData) {
		let text = searchText.toLowerCase();

		var filterBy = this.state.filterBy;

		return issueData.filter((n) => {
			if (n[filterBy]) {
				let iss = n[filterBy].toLowerCase();
				return iss.search(text) !== -1;
			}
		});
	}

	renderItem({ item }) {
		return (
			<ListItem onPress={() => this.props.navigation.navigate('IssueDetails', { id: item.uid })}>
				<ComplexText
					main={item.subject}
					secondary={item.createdBy}
					tertiary={item.description}
				/>
			</ListItem>
		);
	}

	render() {
		return (
			<Page>
				<Modal
					title='Filter Issues'
					visible={this.state.modalVisible}
					onClose={() => this.setState({ modalVisible: false })}
					onRequestClose={() => this.setState({ modalVisible: false })}
					onSubmit={() => { this.setState({ modalVisible: false }); this.requery() }}
				>
					<Picker
						label='Filter By'
						title='Select a field to filter by'
						selectedValue={this.state.filterBy}
						onValueChange={(item, index) => this.setState({ filterBy: item })}
					>
						<Picker.Item label="Subject" value="subject" />
						<Picker.Item label="Creator" value="createdBy" />
						<Picker.Item label="Description" value="description" />
					</Picker>
					<TextInput
						label='Search'
						onChangeText={(text) => this.setState({ searchtext: text })}
						autoCapitalize='none'
					/>
					<Picker
						label='Severity'
						title='Select a severity to filter by'
						selectedValue={this.state.severityFilter}
						onValueChange={(item, index) => this.setState({ severityFilter: item })}
					>
						<Picker.Item label="High" value="3" />
						<Picker.Item label="Medium" value="2" />
						<Picker.Item label="Low" value="1" />
						<Picker.Item label="None" value={null} />
					</Picker>
					<Picker
						label='Issue Type'
						title='Select an issue type to filter by'
						selectedValue={this.state.typeFilter}
						onValueChange={(item, index) => this.setState({ typeFilter: item })}
					>
						<Picker.Item label="Shipping" value='1' />
						<Picker.Item label="Factory Supply" value='2' />
						<Picker.Item label="Quality Control" value='3' />
						<Picker.Item label="None" value={null} />
					</Picker>
					<Picker
						label='Status'
						title='Select a status type to filter by'
						selectedValue={this.state.statusFilter}
						onValueChange={(item, index) => this.setState({ statusFilter: item })}
					>
						<Picker.Item label="Opened" value='opened' />
						<Picker.Item label="Assigned" value='assigned' />
						<Picker.Item label="Resolved" value='resolved' />
						<Picker.Item label="Closed" value='closed' />
						<Picker.Item label="None" value={null} />
					</Picker>

					<TextInput
						label="Created in last X days"
						onChangeText={(text) => this.setState({ daysFilter: text })}
						keyboardType={'numeric'}
						returnKeyType={'done'}

					/>
				</Modal>

				<ListItem fill>
					<Button
						icon='filter'
						title='Filter'
						onPress={() => this.setState({ modalVisible: true, searchtext: '', daysFilter: null })}
					/>
				</ListItem>

				<FlatList
					data={this.state.issues}
					keyExtractor={item => item.uid}
					renderItem={this.renderItem.bind(this)}
					refreshing={this.state.loading}
				/>

				{this.state.loading &&
					<Loading />
				}
			</Page>
		);
	}
}
