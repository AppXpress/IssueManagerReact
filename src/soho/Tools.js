export function getHandler(obj, name) {
	return function () {
		if (obj.props[name]) {
			obj.props[name](...arguments);
		}
		if (obj[name]) {
			obj[name](...arguments);
		}
	}
}
