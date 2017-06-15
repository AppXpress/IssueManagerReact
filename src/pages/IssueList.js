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
				issues: data.result,
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

	renderItem({ item }) {
		return (
			<View>
				<ListCard
					main={item.subject}
					secondary={item.createdBy}
					tertiary={item.description}
					onPress={() => this.props.navigation.navigate('IssueDetails', { issue: item })}
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

				<FlatList
					data={this.state.issues}
					keyExtractor={item => item.uid}
					renderItem={this.renderItem.bind(this)}
					refreshing={this.state.loading}
				/>
			</Page>
		);
	}
}
