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
} from 'react-native';

import {
	Button,
	Card,
	ListCard,
	TextInput
} from '../soho/All';

import { getAuthToken, setToken } from '../restGet';

export default class Login extends Component {

	static navigationOptions = {
		title: 'Welcome',
		headerTintColor: '#ffffff',
		headerStyle: {
			backgroundColor: '#2578a9',
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
				<Card>
					<TextInput
						label='Username'
						onChangeText={(text) => this.setState({ username: text })}
						autoCapitalize='none'
						required
					/>
					<TextInput
						label='Password'
						onChangeText={(text) => this.setState({ password: text })}
						secureTextEntry={true}
						required
					/>
					<TextInput
						label='EID'
						onChangeText={(text) => this.setState({ eid: text })}
						secureTextEntry={true}
						placeholder='Leave Blank if Unnecesarry'
					/>
					<Button
						title='Login'
						onPress={this._handleLogin.bind(this)}
						disabled={this.state.loading || !this.state.username || !this.state.password}
						primary
					/>
				</Card>
				<ActivityIndicator animating={this.state.loading} size="large" />
			</ScrollView>
		);
	}

	async _handleLogin(event) {
		this.setState({ loading: true });
		var response = await getAuthToken(dataKey, this.state.username, this.state.password, this.state.eid);
		this.setState({ loading: false });

		if (response.status != 200) {
			Alert.alert('error');
			console.log(response);

		} else {

			//console.log(response.headers.get('Authorization'));
			setToken(response.headers.get('Authorization'));

			this.props.navigation.navigate('Home');
		}

	}
}

const styles = StyleSheet.create({
	scroll: {
		backgroundColor: '#F0F0F0',
		padding: 0,
		flexDirection: 'column'
	}
});
