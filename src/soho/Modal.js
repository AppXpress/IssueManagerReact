import React, { Component } from 'react';

import {
	Dimensions,
	StyleSheet,
	View,
	ScrollView,
	Text,
	Modal as ModalBase
} from 'react-native';

import Button from './Button';
import Card from './Card';

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
		Dimensions.addEventListener('change', ({ window }) => setSize(window));
	}

	componentWillReceiveProps(next) {
		this.setState({ visible: next.visible });
	}

	getScrollStyle() {
		return {
			maxHeight: this.state.height - 150
		};
	}

	render() {
		return (
			<ModalBase
				{...this.props}
				onRequestClose={getHandler(this, 'onRequestClose')}
				transparent={true}
				animationType='fade'
			>
				<View style={styles.view}>
					<Card title={this.props.title}>
						<ScrollView style={this.getScrollStyle()}>
							{this.props.children}
						</ScrollView>
						<Button
							title='Cancel'
							hue={this.props.hue || 'ruby'}
							onPress={() => {
								this.setState({ visible: false });
								if (this.props.onClose) {
									this.props.onClose();
								}
							}}
						/>
					</Card>
				</View>
			</ModalBase>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'rgba(0, 0, 0, 0.32)',
		justifyContent: 'center',
		flex: 1
	}
});
