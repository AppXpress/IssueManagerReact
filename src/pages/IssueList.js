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
	Navigation,
	Page,
	TextInput,
	Modal,
	Picker,
} from '../soho/All';

export default class IssueList extends Component {

	constructor(props) {
		super(props);

		this.props = props;

		this.state = {};

		Navigation.bind(this);
	}

	componentWillMount() {
		this.reload();
	}

	willAppear() {
		Navigation.set(this, {
			title: 'Issue List',
			buttons: [
				{ icon: 'refresh', id: 'reload' },
				{ icon: 'user', id: 'logout' },
				{ icon: 'add', id: 'create' },
			]
		});
	}

	logout() {
		this.props.navigator.resetTo({ screen: 'Login' });
	}

	create() {
		this.props.navigator.push({
			screen: 'CreateIssue',
			passProps: {
				reload: () => this.reload()
			}
		});
	}

	async reload() {
		this.setState({
			issues: null,
			loading: true
		});

		var appx = await AppX.query('$IssueT3', (this.state.filter || '') + ' ORDER BY modifyTimestamp DESC');
		if (appx.data) {
			this.setState({
				fullIssues: appx.data.result,
				issues: appx.data.result,
				loading: false
			});
		} else {
			alert('We weren\'t able to load any issues. Please try again later!');
		}
	}

	setFilter(query) {
		this.state.filter = query;
		this.reload();
	}

	renderItem({ item }) {
		return (
			<ListItem onPress={() => this.props.navigator.push({
				screen: 'IssueDetails',
				passProps: {
					id: item.uid
				}
			})}>
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
				<ListItem fill>
					<Button
						icon='filter'
						title='Filter'
						onPress={() => this.props.navigator.push({
							screen: 'FilterIssues',
							passProps: { setFilter: query => this.setFilter(query) }
						})}
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
