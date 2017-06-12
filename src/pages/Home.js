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
	getObjects
} from '../RestMethods';

import {
	Button,
	Card,
	ListCard,
	Navigataion,
	TextInput
} from '../soho/All';




export default class Home extends Component {

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
					onPress={() => context.navigation.navigate('Create')}
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
		return await getObjects('$IssueT3');
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
					onPress={() => this.props.navigation.navigate('IssueScreen', { issue: issue })}
				></ListCard>
			</View>
		)
	}

	render() {
		return (
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

				<ListView
					dataSource={this.state.issueData}
					renderRow={this.renderRow.bind(this)}

					enableEmptySections={true}
				/>
			
			</ScrollView>	
		);
	}




	

=======

			<ListView
				dataSource={this.state.issueData}
				renderRow={this.renderRow.bind(this)}

				enableEmptySections={true}
			/>


		);
	}

	goToCreate() {
		this.props.navigation.navigate('Create');
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
