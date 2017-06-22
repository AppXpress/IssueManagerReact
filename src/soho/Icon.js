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

    static getChar(name) {
        if (name) {
            var char = config.glyphs.find(item => {
                return item.css == name;
            });
            if (char) {
                return String.fromCharCode(char.code);
            }
        }
        return '#';
    }

    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            icon: Icon.getChar(this.props.name)
        }
    }

    componentWillReceiveProps(next) {
        if (next.name) {
            this.setState({
                icon: Icon.getChar(next.name)
            });
        }
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
        fontSize: 18,
        fontWeight: 'normal',
        fontFamily: 'soho'
    }
});
