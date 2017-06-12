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
	query
} from '../RestMethods';

import {
	Button,
	Card,
	ListCard,
	Navigataion,
	Page,
	TextInput
} from '../soho/All';

<<<<<<< HEAD:src/pages/Home.js



export default class Home extends Component {
=======
export default class IssueList extends Component {
>>>>>>> 770782a4c8ddee2e404bc93ca824d5545c5dc91f:src/pages/IssueList.js

	constructor(props) {
		super(props);

		this.props = props;

		this.state = {
			issueData: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			searchtext: '',

		};
	}

	static navigationOptions = Navigataion({
		title: 'Issue List',
		right: (context) => {
			return (
				<Text
					style={{ fontSize: 25, color: '#ffffff', fontWeight: "300", paddingRight: 10 }}
					onPress={() => context.navigation.navigate('CreateIssue')}
				>
					+
				</Text>
			);
		}
	});

	// static navigationOptions = ({ navigation }) => {

	// 	return {
	// 	headerRight: (<Text style={{fontSize:25, color: '#ffffff',fontWeight: "300",paddingRight: 10}} onPress={() =>navigation.navigate('Create')}>+</Text>),


	// 	title: 'Issues',
	// 	headerTintColor: '#ffffff',
	// 	headerStyle: {
	// 		backgroundColor: '#2578a9',
	// 	},
	// 	}			

	// }


	async getDataSource() {
		return await query('$IssueT3');
	}



	async componentDidMount() {
		var data = await this.getDataSource();
		if (!data) {
			return;
		}
		console.log(data);
		this.setState({
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
<<<<<<< HEAD:src/pages/Home.js
<<<<<<< HEAD
			<ScrollView
			backgroundColor= '#ffffff'>
			<TextInput
						label='Search'
						onChangeText={(text) => this.setState({ username: text })}
						autoCapitalize='none'
						autoFocus={true}
						backgroundColor= '#ffffff'
						
					/>

=======
			<Page>
>>>>>>> 770782a4c8ddee2e404bc93ca824d5545c5dc91f:src/pages/IssueList.js
				<ListView
					dataSource={this.state.issueData}
					renderRow={this.renderRow.bind(this)}

					enableEmptySections={true}
				/>
<<<<<<< HEAD:src/pages/Home.js
			
			</ScrollView>	
		);
	}




	

=======

			<ListView
				dataSource={this.state.issueData}
				renderRow={this.renderRow.bind(this)}

				enableEmptySections={true}
			/>


=======
			</Page>
>>>>>>> 770782a4c8ddee2e404bc93ca824d5545c5dc91f:src/pages/IssueList.js
		);
	}

	goToCreate() {
		this.props.navigation.navigate('CreateIssue');
	}
>>>>>>> 81b5cda72c3fd7b41d26f251250ecae53600f91c

}





const styles = StyleSheet.create({

	scroll: {
		backgroundColor: '#F0F0F0',
		padding: 0,
		flexDirection: 'column'
	},
	label: {
		color: 'black',
		fontSize: 28
	},
	inp: {
		backgroundColor: '#FFFFFF',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		alignSelf: 'stretch'
	}
});
