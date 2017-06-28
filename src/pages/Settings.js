import React, { Component } from 'react';

import {
	Button,
	Card,
	Navigation,
	Page,
	TextInput,
	Picker,
} from '../soho/All';

import {
	Utilities
} from '../gtn/All';

/**
 * Page component for choosing settings, such as global object and environment
 */
export default class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			environment: 'https://network-rctq.qa.gtnexus.com/rest/310',
			objType: '$IssueT3'
		};

		Navigation.set(this, {
			title: 'Settings',
			
		});
	}

	async saveSettings(){
		await Utilities.storageSet('env', this.state.environment);
		await Utilities.storageSet('objType', this.state.objType);
		this.props.navigator.pop();
	}


	render(){
		return(

			<Page>
				<Card>
					<Picker
                        label='Environment'
                        title='Select an Environment'
                        selectedValue={this.state.environment}
                        onValueChange={item => this.setState({ environment: item })}
                    >
                        <Picker.Item label='PRODUCTION' value='https://network.gtnexus.com/rest/310' />
                        <Picker.Item label='PRE PROD' value='https://preprod.gtnexus.com/rest/310' />
                        <Picker.Item label='DEMO' value='https://demo.gtnexus.com/rest/310' />
                        <Picker.Item label='BETA' value='https://network-beta.gtnexus.com/rest/310' />
                        <Picker.Item label='RCTP' value='https://network-rctp.qa.gtnexus.com/rest/310' />
                        <Picker.Item label='SUPP' value='https://network-suportp.qa.gtnexus.com/rest/310' />
                        <Picker.Item label='SUPPORTQ' value= 'https://network-suportq.qa.gtnexus.com/rest/310' />
                        <Picker.Item label="RCTQ" value='https://network-rctq.qa.gtnexus.com/rest/310' />
                        <Picker.Item label="ALPHAQ" value='https://network-alphaq.qa.gtnexus.com/rest/310' />

                    </Picker>
                   	<TextInput	label='Global Object Identifier'
								value={this.state.objType}
								onChangeText={(text) => this.setState({ objType: text })}
								autoCapitalize='none'
					/>
					<Button
					primary
					title="Save"
					icon='save'
					onPress={()=>this.saveSettings()}
					/>	
				</Card>

			</Page>	
		);
	}


}