import React, { Component } from 'react';

import config from '../../resources/fonts/config';

import {
    StyleSheet,
    Text
} from 'react-native';

import {
    getColor
} from './Tools';

/**
 * Component for displaying SoHo icons
 */
export default class Icon extends Component {

    /**
     * Helper function for getting the character for an icon in the icon font
     * 
     * @param {string} name the name of the SoHo icon
     */
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
        this.setState({
            icon: Icon.getChar(next.name)
        });
    }

    /**
     * Renders the icon character in a text item with the SoHo font
     */
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
