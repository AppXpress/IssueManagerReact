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
} from 'react-native';

import {
	Button,
	Card,
	ListCard,
	TextInput
} from '../soho/All';

import {
	authorize
} from '../RestBase';

import {
	storageGet,
	storageSet
} from '../Utilities';

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

		this.getCredentials();
	}

	async getCredentials() {
		this.setState({ username: await storageGet('username') });
		this.setState({ password: await storageGet('password') });
	}

	async setCredentials() {
		await storageSet('username', this.state.username);
		await storageSet('password', this.state.password);
	}

	render() {
		return (
			<ScrollView style={styles.scroll}>
				<Card>
					<TextInput
						label='Username'
						value={this.state.username}
						onChangeText={(text) => this.setState({ username: text })}
						autoCapitalize='none'
						required
					/>
					<TextInput
						label='Password'
						value={this.state.password}
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
						onPress={this.login.bind(this)}
						disabled={this.state.loading || !this.state.username || !this.state.password}
						primary
					/>
				</Card>
				<ActivityIndicator animating={this.state.loading} size="large" />
			</ScrollView>
		);
	}

	async login(event) {
		this.setState({ loading: true });
		var authenticated = await authorize(this.state.username, this.state.password, this.state.eid);
		this.setState({ loading: false });

		if (authenticated) {
			this.setCredentials();
			this.props.navigation.navigate('Home');
		} else {
			Alert.alert('Login failed. Please try again.');
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
