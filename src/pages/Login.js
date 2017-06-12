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
	Navigataion,
	Page,
	Switch,
	TextInput,
	Picker,
} from '../soho/All';

import {
	authorize
} from '../RestBase';

import {
	storageGet,
	storageSet
} from '../Utilities';

export default class Login extends Component {

	static navigationOptions = Navigataion({
		title: 'Welcome'
	});

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			eid: '',
			loading: false
		};
	}

	async componentDidMount() {
		if (__DEV__) {
			await this.getCredentials();
		}
	}

	async getCredentials() {
		var username = await storageGet('username');
		if (username) {
			this.setState({
				saveUser: true,
				username: username
			});

			var password = await storageGet('password');
			if (password) {
				this.setState({
					savePass: true,
					password: password
				});
			}
		}
	}

	async setCredentials() {
		if (this.state.saveUser) {
			await storageSet('username', this.state.username);

			if (this.state.savePass) {
				await storageSet('password', this.state.password);
			}
			else {
				await storageSet('password', '');
			}
		}
		else {
			await storageSet('username', '');
			await storageSet('password', '');
		}
	}

	async login(event) {
		this.setState({ loading: true });
		var authenticated = await authorize(this.state.username, this.state.password, this.state.eid);
		this.setState({ loading: false });

		if (authenticated) {
			if (__DEV__) {
				this.setCredentials()
			}

			this.props.navigation.navigate('IssueList');
		} else {
			Alert.alert('Login failed. Please try again.');
		}
	}

	render() {
		return (
			<Page>

				<Card>

					<TextInput
						label='Username'
						value={this.state.username}
						onChangeText={(text) => this.setState({ username: text })}
						autoCapitalize='none'
						autoFocus={true}
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
						value={this.state.eid}
						onChangeText={(text) => this.setState({ eid: text })}
						secureTextEntry={true}
						placeholder='Leave Blank if Unnecesary'
					/>
										{__DEV__ &&
						<View>
							<Switch
								label='(DEV) Remember username'
								value={this.state.saveUser}
								onValueChange={(value) => { this.setState({ saveUser: value }) }}
							/>
							<Switch
								label='(DEV) Remember password'
								value={this.state.savePass}
								onValueChange={(value) => { this.setState({ savePass: value }) }}
							/>
						</View>
					}
					<Button
						title='Login'
						onPress={this.login.bind(this)}
						enabled={!this.state.loading && this.state.username && this.state.password}
						primary
					/>
				</Card>
				{this.state.loading &&
					<ActivityIndicator animating={true} size="large" />
				}
			</Page>
		);
	}
}

