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
	ComplexText,
	ListItem,
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
		right: ({ navigation }) => {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Button
						icon
						title='%'
						onPress={() => navigation.state.params.page.reload.call(navigation.state.params.page)}
					/>
					<Button
						icon
						title='+'
						onPress={() => navigation.navigate('CreateIssue', { page: navigation.state.params.page })}
					/>
				</View>
			);
		}
	});

	componentDidMount() {
		this.reload();
		this.props.navigation.setParams({
			page: this
		});
	}

	async reload() {
		this.setState({
			issues: null,
			loading: true
		});

		var data = await AppX.query('$IssueT3', 'ORDER BY modifyTimestamp DESC');
		if (data) {
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

		let filteredData = this.filterIssues(searchText, this.state.issues);
		this.setState({ issues: filteredData });
	}

	filterIssues(searchText, issueData) {
		let text = searchText.toLowerCase();

		return issueData.filter((n) => {
			if (n.subject) {
				let iss = n.subject.toLowerCase();
				return iss.search(text) !== -1;
			}
		});
	}

	renderItem({ item }) {
		return (
			<ListItem onPress={() => this.props.navigation.navigate('IssueDetails', { issue: item })}>
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
				<ListItem>
					<TextInput
						label='Search'
						onChangeText={this.setSearchText.bind(this)}
						autoCapitalize='none'
					/>
				</ListItem>

				{this.state.loading &&
					<ActivityIndicator animating={true} size="large" />
				}

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
