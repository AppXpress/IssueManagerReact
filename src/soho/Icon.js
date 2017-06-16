import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    WebView
} from 'react-native';

import {
    getColor
} from './Tools';

import Resources from './IconResources';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    html() {
        if (!Images[this.props.source]) {
            return null;
        }

        return `
        <html>
        <head>
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                svg {
                    height: 100%;
                    width: 100%;
                    position: fixed;
                    top: 0;
                    left: 0;
                }
                svg path {
                    fill: ${getColor(this.props.color)};
                }
            </style>
        </head>
        <body>
            ${Images[this.props.source]}
        </body>
        `;
    }

    render() {
        return (
            <WebView
                style={styles.image}
                scrollEnabled={false}
                source={{ html: this.html() }}
            />
        );
    }
};

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent'
    }
});
