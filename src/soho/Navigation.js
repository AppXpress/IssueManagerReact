import {
	getColor
} from './Tools';

export default function Navigation(options) {
	return (context) => {
		function runOrReturn(value) {
			if (typeof value == 'function') {
				return value(context);
			}
			return value;
		}

		var nav = {};
		if (typeof options == 'object') {
			if (options.title) {
				nav.title = runOrReturn(options.title);
			}

			nav.headerTintColor = getColor('white-0');
			if (options.hue) {
				options.hue = runOrReturn(options.hue);
			}
			nav.headerStyle = {
				backgroundColor: getColor(options.hue + '-7', 'azure-7')
			};

			if (options.right) {
				nav.headerRight = runOrReturn(options.right);
			}
		}
		return nav;
	}
}
