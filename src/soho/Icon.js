import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    WebView
} from 'react-native';

import {
    getColor
} from './Tools';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    getSvg() {
        return '<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><title>add</title><desc>Created with Sketch.</desc><path d="M16 8h-6v-6c0-.552-.448-1-1-1s-1 .448-1 1v6h-6c-.552 0-1 .448-1 1s.448 1 1 1h6v6c0 .552.448 1 1 1s1-.448 1-1v-6h6c.552 0 1-.448 1-1s-.448-1-1-1" fill="#5C5C5C"/></svg>';
    }

    html() {
        var svg = '';
        if (this.props.source) {
            svg = this.getSvg(this.props.source);
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
            ${svg}
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
        height: 24
    }
});
