import React, { Component } from 'react';

import {
	Dimensions,
	StyleSheet,
	View,
	FlatList,
	ScrollView,
	Text,
	Picker as PickerBase
} from 'react-native';

import Button from './Button';
import Card from './Card';
import ListCard from './ListCard';
import Modal from './Modal';
import Touchable from './Touchable';

import {
	getHandler,
	getColor
} from './Tools';

export default class Picker extends Component {

	static Item = (props) => {
		this.props = props;
	}

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			data: props.children,
			visible: false,
			value: null
		}
	}

	componentWillReceiveProps(next) {
		this.setState({
			value: next.selectedValue,
			data: next.children
		});
	}

	getLabel() {
		if (this.state.value) {
			var selected = this.props.children.find(item => {
				return item.props.value == this.state.value;
			});

			if (selected) {
				return selected.props.label;
			}
		}
	}

	onValueChange(value) {
		this.setState({
			value: value,
			visible: false
		});
	}

	renderItem({ item }) {
		return (
			<ListCard
				main={item.props.label}
				secondary={item.props.secondary}
				tertiary={item.props.tertiary}
				onPress={() => getHandler(this, 'onValueChange')(item.props.value)}
			/>
		);
	}

	render() {
		return (
			<View style={styles.view}>
				{this.props.label &&
					<Text style={styles.label}>
						{this.props.label}
						{this.props.required && (
							<Text style={styles.error}>*</Text>
						)}
					</Text>
				}

				<View style={styles.innerView}>
					<Touchable
						style={styles.touchable}
						onPress={() => this.setState({ visible: true })}
					>
						<Text style={styles.value}>
							{this.getLabel()}
						</Text>
					</Touchable>
				</View>

				<Modal
					title={this.props.title}
					visible={this.state.visible}
					onClose={() => this.setState({ visible: false })}
					onRequestClose={() => this.setState({ visible: false })}
				>
					<FlatList
						data={this.state.data}
						keyExtractor={item => item.props.value}
						renderItem={this.renderItem.bind(this)}
						ListEmptyComponent={(
							<ListCard main='No options available' />
						)}
					/>
				</Modal>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		margin: 10,
	},
	label: {
		fontSize: 12,
		color: getColor('graphite-6')
	},
	innerView: {
		borderRadius: 2,
		borderWidth: 1,
		borderColor: getColor('graphite-4')
	},
	touchable: {
		height: 34,
		justifyContent: 'center'
	},
	value: {
		padding: 0,
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 14,
		color: getColor('graphite-10')
	},
	picker: {
		height: 34,
		padding: 0,
		paddingLeft: 10,
		color: getColor('graphite-10')
	}
});
