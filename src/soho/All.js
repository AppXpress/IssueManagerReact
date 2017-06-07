import Button from './Button';
import Card from './Card';
import ListCard from './ListCard';
import TextInput from './TextInput';

const SoHo = {
	get Button() { return Button; },
	get Card() { return Card; },
	get ListCard() { return ListCard; },
	get TextInput() { return TextInput; },
}

module.exports = SoHo;
