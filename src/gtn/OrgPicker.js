import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput as TextInputBase
} from 'react-native';

import {
	Picker,
	getHandler
} from '../soho/All';

import {
	AppX
} from './AppX';

export default class OrgPicker extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			orgs: [],
			value: null
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ value: next.selectedValue });
	}

	async componentDidMount() {
		var result = await query('Community');
		this.setState({ orgs: result.result[0].member });
	}

	onValueChange(value) {
		this.setState({ value: value });
	}

	getOptions() {
		var elements = [];

		elements.push((
			<Picker.Item label='' value={null} key={null} />
		));

		this.state.orgs.forEach(org => {
			elements.push((
				<Picker.Item label={org.name} value={org.memberId} key={org.memberId} />
			));
		});

		return elements;
	}

	render() {
		return (
			<Picker
				{...this.props}
				selectedValue={this.state.value}
				onValueChange={getHandler(this, 'onValueChange')}
			>
				{this.getOptions()}
			</Picker>
		);
	}
}
