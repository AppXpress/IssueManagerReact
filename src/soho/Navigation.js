import React, { Component } from 'react';

import {
	View
} from 'react-native';

import Button from './Button';

import {
	getColor
} from './Tools';

export default function Navigation(options) {
	return (context) => {

		var page = null;
		try {
			page = context.navigation.state.params.page;
		} catch (error) {
			// Ignore
		}

		function evaluate(value) {
			if (typeof value == 'function') {
				if (page) {
					return value.call(page);
				} else {
					return null;
				}
			}
			return value;
		}

		return {
			title: evaluate(options.title),
			headerTintColor: getColor('white-0'),
			headerStyle: {
				backgroundColor: getColor(evaluate(options.hue) + '-7', 'azure-7')
			},
			headerRight: page ? (
				<View style={{ flexDirection: 'row' }}>
					{evaluate(options.buttons)}
				</View>
			) : null
		};
	}
}
