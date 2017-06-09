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
	getObjects,
	getObjectsOQL,
} from '../RestMethods';

import {
	Button,
	Card,
	ListCard,
	TextInput
} from '../soho/All';

export default class IssueScreen extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			messageList : new ListView.DataSource({
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
				messageList : false,
				loading: false,
			});
			console.log(data);
			return;
		}
		console.log(data);
		this.setState({
			messageList: this.state.messageList.cloneWithRows(data.result.reverse()),
			loading: false,
		});



	}

	static navigationOptions = ( { navigation }) => ({

		title: navigation.state.params.issue.subject,
		headerTintColor: '#ffffff',
		headerStyle: {
			backgroundColor: '#2578a9',
		},
		});

	async getComments(){
		return await getObjectsOQL('$MessageT4',"issue.rootId = "+this.state.issue.uid);
	}
	

	render(){
		return(
			<ScrollView>

			<Card>
				<Text style = {styles.main}>
					Issue Created By:
				</Text>
				<Text style={styles.secondary}>
					{this.state.issue.createdBy}
				</Text>
				<Text style={styles.main}>
					Issue Created On:
				</Text>
				<Text style={styles.secondary}>
					{this.state.issue.createdOn}
				</Text>	

			</Card>

			<Card>
				<Text style = {styles.secondary}>
					Description:
				</Text>
				<Text style = {styles.primary}>
					{this.state.issue.description}
				</Text>	

				<Text style = {styles.secondary}>
					Status:					

				</Text>
				<Text style = {styles.primary}>
					{this.state.issue.status}
				</Text>	

				<Text style = {styles.secondary}>
					Issue Type:					
				</Text>
				<Text style = {styles.primary}>
					{getType(this.state.issue.issueType)}
				</Text>	
				<Text style = {styles.secondary}>
					Severity:					
				</Text>
				<Text style = {styles.primary}>
					{getSeverity(this.state.issue.severity)}
				</Text>	

			</Card>

			<Card>
				<Text style={styles.secondary}>
				Assigned To:
				</Text>
				<Text style={styles.primary}>
				{this.getAssignedTo()}
				</Text>
			</Card>

			{this.state.loading &&
				<ActivityIndicator animating={true} size="large" />
			}

			{this.state.messageList && !this.state.loading &&
			<Card>
			<Text style={styles.secondary}>
			Messages:
			</Text>
			

			<ListView dataSource={this.state.messageList}
					renderRow={this.renderRow.bind(this)}

					enableEmptySections={true}
			/>
			</Card>
		}

		{!this.state.messageList && !this.state.loading &&
			<Card>
			<Text style ={styles.secondary}>
			There are no messages Yet.
			</Text>
			</Card>
		}

		</ScrollView>

			);
	}
	 getAssignedTo(){
	 	
		if(this.state.issue.participants[1]){
			return this.state.issue.participants[1].party.name;
		}else{
			return 'Unassigned';
		}

	}

}	



function getType(level){

	if (level == 3){
		return 'Quality Control';

	}

	if (level == 2){
		return 'Factory Supply';
		
	}

	if (level == 1){
		return 'Shipping';
		
	}

}
function getSeverity(level){

	if (level == 3){
		return 'High';

	}

	if (level == 2){
		return 'Medium';
		
	}

	if (level == 1){
		return 'Low';
		
	}

}

const styles = StyleSheet.create({
	view: {
		padding: 20,
		backgroundColor: '#ffffff',
		borderBottomWidth: 1,
		borderBottomColor: '#bdbdbd'
	},
	main: {
		fontSize: 14,
		color: '#1a1a1a'
	},
	secondary: {
		fontSize: 12,
		color: '#5c5c5c'
	},
	tertiary: {
		fontSize: 10,
		color: '#999999',
		fontWeight: 'bold'
	}
});