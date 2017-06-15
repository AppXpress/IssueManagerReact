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

			if (options.right) {
				nav.headerRight = runOrReturn(options.right);
			}
		}
		return nav;
	}
}
