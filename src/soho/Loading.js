import React, { Component } from 'react';

import {
    StyleSheet,
    Modal,
    View,
    ActivityIndicator
} from 'react-native';

import ListItem from './ListItem';
import Page from './Page';

import {
    getColor,
    getHandler
} from './Tools';

export default class Loading extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        if (this.props.block) {
            return (
                <Modal
                    transparent={true}
                    animationType='fade'
                    onRequestClose={getHandler(this, 'onRequestClose')}
                >
                    <View style={styles.view}>
                        <ActivityIndicator animating={true} size="large" />
                    </View>
                </Modal>
            );
        } else {
            return (
                <ListItem>
                    <ActivityIndicator animating={true} size="large" />
                </ListItem>
            );
        }
    }
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
        justifyContent: 'center',
        flex: 1
    }
});
