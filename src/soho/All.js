import Button from './Button';
import Card from './Card';
import ComplexText from './ComplexText';
import Field from './Field';
import Icon from './Icon';
import ListItem from './ListItem';
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
	get ComplexText() { return ComplexText; },
	get Field() { return Field; },
	get Icon() { return Icon; },
	get ListItem() { return ListItem; },
	get Modal() { return Modal; },
	get Navigataion() { return Navigataion; },
	get Page() { return Page; },
	get Picker() { return Picker; },
	get Switch() { return Switch; },
	get TextInput() { return TextInput; },

	get getHandler() { return getHandler; },
	get getColor() { return getColor; }
}

module.exports = soho;
