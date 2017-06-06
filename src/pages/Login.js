import React, { Component } from 'react';
import dataKey from '../dataKey';

import {
	Alert,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	StatusBar,
	ActivityIndicator
} from 'react-native';

import Button from '../SoHo/Button';

import Container from '../components/Container';

import Label from '../components/Label';

import { getAuthToken } from '../restGet';

export default class Login extends Component {
<<<<<<< HEAD

	static navigationOptions = {
		title: 'Welcome',
	};


	constructor(props){
=======
	constructor(props) {
>>>>>>> b9cc9506c8be006bbd2c6aa7947b67e273af6a66
		super(props);

		this.state = {
			username: '',
			password: '',
			eid: '',
			loading: false
		};
	}

	render() {
		return (

			<ScrollView style={styles.scroll}>
				<Container>
				</Container>
				<Container>

					<TextInput
						style={styles.inp}
						placeholder='Username'
						onChangeText={(text) => this.setState({ username: text })}
						autoCapitalize='none'
					/>

					<TextInput
						secureTextEntry={true}
						style={styles.inp}
						placeholder='Password'
						onChangeText={(text) => this.setState({ password: text })}
					/>
					<TextInput
						secureTextEntry={true}
						style={styles.inp}
						placeholder='EID (Leave Blank if Unnecesarry)'
						onChangeText={(text) => this.setState({ eid: text })}
					/>
				</Container>

				<Container>
					<Button
						onPress={this._handleLogin.bind(this)}
						title="Login"
						primary
						disabled={this.state.loading}
					/>

<<<<<<< HEAD
			<Container>
				<Button
					onPress = {this._handleLogin.bind(this)}
					title= "Login"
					backgroundColor = "#8DC9E6"	
				/>

				<ActivityIndicator animating={this.state.loading} size="large"/>
			</Container>		

        </ScrollView>
    );
  }

  _handleLogin(event) {
  	

 		this.setState({loading : true});
  		var response = getAuthToken(dataKey, this.state.username, this.state.password, this.state.eid, (response) => {
  			this.setState({loading: false});
  			if (response.status!=200){
  				Alert.alert('error');
  			}
  			console.log(response);
  		});

	}

=======
					<ActivityIndicator animating={this.state.loading} size="large" />
				</Container>

			</ScrollView>
		);
	}

	_handleLogin(event) {
		this.setState({ loading: true });

		if (this.state.eid != '') {
			var toEncode = this.state.username + ":" + this.state.password + ":" + this.state.eid;
		} else {

			var toEncode = this.state.username + ":" + this.state.password;
		}
		var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var padding = "";
		var encodedString = "";

		//checking if credential string has length of multiple of 3
		if ((toEncode.length % 3) > 0) {
			var i = (toEncode.length % 3);
			for (; i < 3; i++) {
				padding += "=";
				toEncode += "\0";
			}
		}

		//iterating through all triplets in input string
		for (var i = 0; i < toEncode.length; i += 3) {

			//every triplet gets mapped to a 24 bit number
			var n = (toEncode.charCodeAt(i) << 16) + (toEncode.charCodeAt(i + 1) << 8) + (toEncode.charCodeAt(i + 2));

			//this new number gets seperated into four 6 bit numbers
			n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];

			//use new numbers as indices from base64 char list
			encodedString += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];

		}
		encodedString = encodedString.substring(0, encodedString.length - padding.length) + padding;

		//to create final token add "Basic "

		var finalToken = "Basic " + encodedString;
		var res;

		//getting repsponse from api

		fetch('https://demo.gtnexus.com/rest/310?dataKey=' + dataKey,
			{
				method: "GET",
				headers: {
					"Authorization": finalToken,
					"Content-Type": "application/json"
				}
			}).then(
			function (response) {
				if (response.status !== 200) {
					this.setState({ loading: false });
					Alert.alert('Error', 'Authentication Failed' + "\n" + response.status + "\n" + finalToken);
					return;
				}

				Alert.alert('Success', response.statusText);
				this.setState({ loading: false });
			}.bind(this)

			)

	}
}
>>>>>>> b9cc9506c8be006bbd2c6aa7947b67e273af6a66

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

