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
			height: 0
		}
	}

	componentDidMount() {
		var self = this;
		function setHeight(value) {
			self.setState({
				height: value
			});
		}

		setHeight(Dimensions.get('window').height);
		Dimensions.addEventListener('change', dimensions => {
			setHeight(dimensions.window.height);
		});
	}

	componentWillReceiveProps(next) {
		this.setState({ visible: next.visible });
	}

	getScrollStyle() {
		return { maxHeight: this.state.height - 150 };
	}

	onClose() {
		this.setState({ visible: false });
	}

	render() {
		return (
			<ModalBase
				{...this.props}
				transparent={true}
				animationType='fade'
				onRequestClose={getHandler(this, 'onRequestClose')}
			>
				<View style={styles.view}>
					<Card title={this.props.title}>
						<ScrollView style={this.getScrollStyle()}>
							{this.props.children}
						</ScrollView>
						<View style={styles.footer}>
							<View style={styles.footerItem}>
								<Button
									title='Cancel'
									onPress={() => getHandler(this, 'onClose')()}
								/>
							</View>
							{this.props.onSubmit &&
								<View style={styles.footerItem}>
									<Button
										title='Submit'
										hue={this.props.hue || 'azure'}
										onPress={() => getHandler(this, 'onSubmit')()}
									/>
								</View>
							}
						</View>
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
	},
	footer: {
		borderTopWidth: 1,
		borderColor: getColor('graphite-3'),
		flexDirection: 'row'
	},
	footerItem: {
		flex: 1,
		flexDirection: 'column'
	}
});
