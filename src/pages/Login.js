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
	ActivityIndicator,
	AsyncStorage,
} from 'react-native';

import Button from '../SoHo/Button';

import Container from '../components/Container';

import Label from '../components/Label';

import { getAuthToken } from '../restGet';

export default class Login extends Component {

	static navigationOptions = {
		title: 'Welcome',
		headerTintColor: '#D58F4A',
		headerStyle: {
			backgroundColor: '#368ac0',
		},
	};

	constructor(props) {
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

					<ActivityIndicator animating={this.state.loading} size="large" />
				</Container>

			</ScrollView>
		);
	}

 _handleLogin(event) {


		this.setState({ loading: true });
		var response = getAuthToken(dataKey, this.state.username, this.state.password, this.state.eid, async (response) => {
			this.setState({ loading: false });
			if (response.status != 200) {
				Alert.alert('error');
			}else{
				console.log(response.headers.get('Authorization'));

				try {
				await AsyncStorage.setItem("authToken", response.headers.get('Authorization'));
				}catch(error){
					console.log(error);
				}
				this.props.navigation.navigate('Home');
				}
			});


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

