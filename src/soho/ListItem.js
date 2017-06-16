import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';

import Touchable from './Touchable';

import {
    getColor
} from './Tools';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    getStyle() {
        var style = {};

        if (this.props.fill) {
            style.padding = 0;
        }

        return [styles.view, style];
    }

    render() {
        if (this.props.onPress) {
            return (
                <Touchable
                    onPress={this.props.onPress}
                    style={this.getStyle()}
                >
                    {this.props.children}
                </Touchable>
            );
        } else {
            return (
                <View style={this.getStyle()}>
                    {this.props.children}
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    view: {
        padding: 20,
        backgroundColor: getColor('white-0'),
        borderColor: getColor('graphite-3'),
        borderBottomWidth: 1
    }
});
