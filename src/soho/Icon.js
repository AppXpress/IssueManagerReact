import React, { Component } from 'react';

import config from '../../resources/fonts/config';

import {
    StyleSheet,
    Text
} from 'react-native';

import {
    getColor
} from './Tools';

export default class Icon extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            icon: this.getChar(this.props.name)
        }
    }

    componentWillReceiveProps(next) {
        if (next.name) {
            this.setState({
                icon: this.getChar(next.name)
            });
        }
    }

    getChar(name) {
        if (this.props.name) {
            var items = config.glyphs.filter(item => {
                return item.css == name;
            });
            if (items.length == 1) {
                return String.fromCharCode(items[0].code);
            }
        }
        return '';
    }

    render() {
        return (
            <Text style={styles.text}>
                {this.state.icon}
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'soho'
    }
});
