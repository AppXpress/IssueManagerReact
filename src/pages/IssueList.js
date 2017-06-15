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
	TouchableOpacity,
} from 'react-native';

import {
	AppX
} from '../gtn/All';

import {
	Button,
	Card,
	ListCard,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

export default class IssueList extends Component {

	source = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			data: this.source.cloneWithRows({}),
			searchtext: ''
		};
	}

	static navigationOptions = Navigataion({
		title: 'Issue List',
		right: (context) => {
			return (
				<Button
					icon
					title='+'
					onPress={() => context.navigation.navigate('CreateIssue')}
				/>
			);
		}
	});

	componentDidMount() {
		this.reload();
	}

	async reload() {
		this.setState({ loading: true });

		var data = await AppX.query('$IssueT3');
		if (data && data.result) {
			this.setState({
				data: this.source.cloneWithRows(data.result),
				loading: false
			});
		} else {
			alert('We weren\'t able to load any issues. Please try again later!');
		}
	}

	setSearchText(event) {
		let searchText = event;
		this.setState({ searchtext: searchText });

		let filteredData = this.filterIssues(searchText, this.state.rawData);
		this.setState({ issueData: this.state.issueData.cloneWithRows(filteredData) });
	}

	filterIssues(searchText, issueData) {
		let text = searchText.toLowerCase();

		return issueData.result.filter((n) => {
			if (n.subject) {
				let iss = n.subject.toLowerCase();
				return iss.search(text) !== -1;
			}
		});
	}

	renderRow(issue) {
		return (
			<View>
				<ListCard
					main={issue.subject}
					secondary={issue.createdBy}
					tertiary={issue.description}
					onPress={() => this.props.navigation.navigate('IssueDetails', { issue: issue })}
				/>
			</View>
		);
	}

	render() {
		return (
			<Page>
				<ListCard>
					<TextInput
						label='Search'
						onChangeText={this.setSearchText.bind(this)}
						autoCapitalize='none'
					/>
				</ListCard>

				<ListView
					enableEmptySections={true}
					dataSource={this.state.data}
					renderRow={issue => this.renderRow(issue)}
				/>
			</Page>
		);
	}
}
