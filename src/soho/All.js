import Button from './Button';
import Card from './Card';
import Field from './Field';
import ListCard from './ListCard';
import Modal from './Modal';
import Navigataion from './Navigation';
import Page from './Page';
import Picker from './Picker';
import Switch from './Switch';
import TextInput from './TextInput';

import {
	getColor,
	getHandler
} from './Tools.js';

const soho = {
	get Button() { return Button; },
	get Card() { return Card; },
	get Field() { return Field; },
	get ListCard() { return ListCard; },
	get Modal() { return Modal; },
	get Navigataion() { return Navigataion; },
	get Page() { return Page; },
	get Picker() { return Picker; },
	get Switch() { return Switch },
	get TextInput() { return TextInput; },

	get getHandler() { return getHandler; },
	get getColor() { return getColor; }
}

module.exports = soho;
