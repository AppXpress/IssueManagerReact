import * as AppX from './AppX';
import OrgPicker from './OrgPicker';
import * as Utilities from './Utilities';

const gtn = {
	get AppX() { return AppX; },
	get OrgPicker() { return OrgPicker; },
	get Utilities() { return Utilities; }
}

module.exports = gtn;
