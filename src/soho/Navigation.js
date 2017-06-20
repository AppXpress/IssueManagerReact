import React, { Component } from 'react';

import {
	View
} from 'react-native';

import Button from './Button';

import {
	getColor
} from './Tools';

export default function Navigation(options) {
	return (...args) => {
		function runOrReturn(value) {
			if (typeof value == 'function') {
				return value(...args);
			}
			return value;
		}

		var nav = {};

		if (typeof options == 'object') {
			if (options.title) {
				nav.title = runOrReturn(options.title);
			}

			nav.headerTintColor = getColor('white-0');

			var hue;
			if (options.hue) {
				hue = runOrReturn(options.hue);
			}

			var color;
			if (options.color) {
				color = runOrReturn(options.color);
			}

			nav.headerStyle = {
				backgroundColor: getColor(color, hue + '-7', 'azure-7')
			};

			if (options.buttons && options.buttons.length > 0) {
				var i = 0;
				var navigation = args[0].navigation

				nav.headerRight = (
					<View style={{ flexDirection: 'row' }}>
						{options.buttons.map(button => {
							return (
								<Button
									key={i++}
									icon={button.icon}
									onPress={() => navigation.state.params.page[button.call].call(navigation.state.params.page)}
								/>
							);
						})}
					</View>
				);
			}
		}
		return nav;
	}
}
