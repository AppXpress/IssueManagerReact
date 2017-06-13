import React, { Component } from 'react';

import {
	Dimensions,
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
			visible: false,
			width: 0,
			height: 0
		}
	}

	componentDidMount() {
		var self = this;
		function setSize(size) {
			self.setState({
				width: size.width,
				height: size.height
			});
		}

		setSize(Dimensions.get('window'));

		Dimensions.addEventListener('change', args => {
			setSize(args.window);
		});
	}

	componentWillReceiveProps(next) {
		this.setState({ visible: next.visible });
	}

	getViewStyle() {
		return [styles.view, {
			width: this.state.width,
			height: this.state.height
		}];
	}

	render() {
		return (
			<ModalBase
				{...this.props}
				onRequestClose={getHandler(this, 'onRequestClose')}
				transparent={true}
				animationType='fade'
			>
				<View style={this.getViewStyle()}>
					{this.props.children}
				</View>
			</ModalBase>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'rgba(0, 0, 0, 0.32)',
		justifyContent: 'center'
	}
});
