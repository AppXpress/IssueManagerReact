import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Modal as ModalBase
} from 'react-native';

import {
	getHandler,
	getColor
} from './Tools';

export default class Modal extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			visible: false
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ visible: next.visible });
	}

	render() {
		return (
			<ModalBase
				{...this.props}
				style={styles.modal}
				visible={this.state.visible}
				onRequestClose={getHandler(this, 'onRequestClose')}
			>

			</ModalBase>
		);
	}
};

const styles = StyleSheet.create({
	modal: {
		height: 50
	}
});
