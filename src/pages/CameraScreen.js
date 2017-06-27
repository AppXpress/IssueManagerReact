import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {
	Icon,
} from '../soho/All'

import Camera from 'react-native-camera';

export default class CameraScreen extends Component {

	    constructor(props) {
        super(props);

        this.state = {};

    }

    render(){
    	return(
    		<View style={styles.container} >
    			<Camera 
    			        ref={(cam) => {
            			this.camera = cam;
          				}}
          			aspect={Camera.constants.Aspect.fill}
          			style={styles.preview}>
          			<Icon icon='upload' />

          			</Camera>	
    		</View>	


    		);

    }
}

const styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  			},

  	container: {
    flex: 1,
    flexDirection: 'row',
  			},
  	capture: {
  		flex: 0,
  		borderRadius: 5,
  		padding: 10,
  		margin: 40,
  	},			
  });    