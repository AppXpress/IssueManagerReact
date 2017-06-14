import React, { Component } from 'react';

import {
	DataSource,
	Dimensions,
	StyleSheet,
	View,
	ListView,
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

		const source = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.props = props;
		this.state = {
			data: source.cloneWithRows(props.children),
			visible: false,
			value: null
		}
	}

	componentWillReceiveProps(next) {
		this.setState({ value: next.selectedValue });
	}

	getLabel() {
		if (this.props.label) {
			return (
				<Text style={styles.label}>
					{this.props.label}
					{this.props.required && (
						<Text style={styles.error}>*</Text>
					)}
				</Text>
			);
		}
	}

	onValueChange(value) {
		this.setState({ value: value })
	}

	renderItem(item) {
		return (
			<ListCard
				main={item.props.main}
				secondary={item.props.secondary}
				tertiary={item.props.tertiary}
				onPress={() => {
					this.setState({
						value: item.props.value,
						visible: false
					});
					if (this.props.onValueChange) {
						this.props.onValueChange(item.props.value);
					}
				}}
			/>
		);
	}

	render() {
		return (
			<View style={styles.view}>
				{this.getLabel()}
				<View style={styles.innerView}>
					<Touchable
						style={styles.touchable}
						onPress={() => this.setState({ visible: true })}
					>
						<Text style={styles.value}>
							{this.state.value}
						</Text>
					</Touchable>
				</View>
				<Modal
					title={this.props.label}
					visible={this.state.visible}
					onClose={() => this.setState({ visible: false })}
					onRequestClose={() => this.setState({ visible: false })}
				>
					<ListView
						dataSource={this.state.data}
						renderRow={item => this.renderItem(item)}
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
