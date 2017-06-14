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

	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			issueData: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			searchtext: '',
			rawData: '',
		};
	}

	static navigationOptions = Navigataion({
		title: 'Issue List',
		right: (context) => {
			return (
				<Button
					title='+'
					icon
					style={{ fontSize: 25, color: '#ffffff', fontWeight: "300", paddingRight: 10 }}
					onPress={() => context.navigation.navigate('CreateIssue')}
				/>
			);
		}
	});



	async getDataSource() {
		return await AppX.query('$IssueT3');
	}



	async componentDidMount() {
		var data = await this.getDataSource();
		if (!data) {
			return;
		}
		console.log(data);
		this.setState({
			rawData: data,
			issueData: this.state.issueData.cloneWithRows(data.result),
		});


	}

	renderRow(issue) {
		return (
			<View>
				<ListCard main={issue.subject} secondary={issue.createdBy} tertiary={issue.description}
					onPress={() => this.props.navigation.navigate('IssueDetails', { issue: issue })}
				></ListCard>
			</View>
		)
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
					dataSource={this.state.issueData}
					renderRow={this.renderRow.bind(this)}
					enableEmptySections={true}
				/>
			</Page>
		);
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
				let iss = n.subject.toLowerCase()
				return iss.search(text) !== -1;
			}
		});
	}
}
