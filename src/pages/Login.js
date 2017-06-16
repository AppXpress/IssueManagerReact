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
	Picker
} from '../soho/All';

import {
	AppX,
	Utilities
} from '../gtn/All';

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
		var username = await Utilities.storageGet('username');
		var password = await Utilities.storageGet('password');
		if (username) {
			this.setState({
				save: true,
				username: username,
				password: password
			});
		}
	}

	async setCredentials() {
		if (this.state.save) {
			await Utilities.storageSet('username', this.state.username);
			await Utilities.storageSet('password', this.state.password);
		}
		else {
			await Utilities.storageSet('username', '');
			await Utilities.storageSet('password', '');
		}
	}

	async login(event) {
		this.setState({ loading: true });
		var auth = await AppX.login(this.state.username, this.state.password, this.state.eid);
		this.setState({ loading: false });

		if (auth) {
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
								label='(DEV) Remember user'
								value={this.state.save}
								onValueChange={(value) => { this.setState({ save: value }) }}
							/>
						</View>
					}
					<Button
						title='Login'
						onPress={this.login.bind(this)}
						disabled={this.state.loading || !this.state.username || !this.state.password}
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

