import React, { Component } from 'react';
import dataKey from '../dataKey';
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
	getToken,
	getObjects
} from '../restGet';

import {
	Button,
	Card,
	ListCard,
	TextInput
} from '../soho/All';

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			token: getToken(),
			issueData: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			
		};
	}

	static navigationOptions = {
		title: 'Issues',
		headerTintColor: '#ffffff',
		headerStyle: {
			backgroundColor: '#2578a9',
		},
	}


	async getDataSource(){
		var results;
    	results = await getObjects('$IssueT3');
    	
    	return  results;
    }	



	async componentDidMount(){
		var data = await this.getDataSource();
		console.log(data);
		this.setState({
			issueData: this.state.issueData.cloneWithRows(data.result)
		});
		
	
	}

	renderRow(issue){
		return (
			<View>
			<ListCard main={issue.subject} secondary={issue.createdBy} tertiary={issue.description}></ListCard>
			</View>
			)
	}

	render() {
    	return (
    		<View>
    			<ListView                     
          		dataSource={this.state.issueData}
        		renderRow={this.renderRow.bind(this)}
          	
          		enableEmptySections={true}
        />
    		</View>

    	);		
    }

	

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