import Button from './Button';
import Card from './Card';
import ListCard from './ListCard';
import Switch from './Switch';
import TextInput from './TextInput';

const SoHo = {
	get Button() { return Button; },
	get Card() { return Card; },
	get ListCard() { return ListCard; },
	get Switch() { return Switch },
	get TextInput() { return TextInput; }
}

module.exports = SoHo;
