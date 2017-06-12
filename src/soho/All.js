import Button from './Button';
import Card from './Card';
import Field from './Field';
import ListCard from './ListCard';
import Navigataion from './Navigation';
import Page from './Page';
import Switch from './Switch';
import TextInput from './TextInput';

import { getColor } from './Tools.js';

const SoHo = {
	get Button() { return Button; },
	get Card() { return Card; },
	get Field() { return Field; },
	get ListCard() { return ListCard; },
	get Navigataion() { return Navigataion; },
	get Page() { return Page; },
	get Switch() { return Switch },
	get TextInput() { return TextInput; },

	get getColor() { return getColor; }
}

module.exports = SoHo;
