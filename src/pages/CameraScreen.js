import React, { Component } from 'react';

import {
    View,
} from 'react-native';

import Camera from 'react-native-camera';

export default class CameraScreen extends Component {

	    constructor(props) {
        super(props);

        this.state = {};

    }

    render(){
    	return(
    		<View>
    			<Camera />
    		</View>	


    		);

    }
}    