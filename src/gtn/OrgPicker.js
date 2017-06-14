import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	ListView,
	Text,
	TextInput as TextInputBase
} from 'react-native';

import {
	Picker,
	getHandler
} from '../soho/All';

import * as AppX from './AppX';

export default class OrgPicker extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			orgs: [],
			value: null
		}

		AppX.query('Community').then(result => this.setState({ orgs: result.result[0].member }));
	}

	componentWillReceiveProps(next) {
		this.setState({ value: next.selectedValue });
	}

	onValueChange(value) {
		this.setState({ value: value });
	}

	render() {
		return (
			<Picker
				{...this.props}
				title='Select an organization'
				selectedValue={this.state.value}
				onValueChange={getHandler(this, 'onValueChange')}
			>
				{this.state.orgs.map(org => (
					<Picker.Item label={org.name} secondary={org.memberId} value={org.memberId} key={org.memberId} />
				))}
			</Picker>
		);
	}
}
