import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from 'react-native';

import {
	Icon,
	Navigation,
	Page,
	Card,
} from '../soho/All'



export default class CameraDisplay extends Component {

		constructor(props) {
        super(props);

        this.state = {};

        Navigation.set(this, {
			title: 'Attachment',
			hue: 'slate',
		});
		console.log(this.props.image);

    }

    render(){
    	return(
    		<Page>
    			<Card>
    				<Image source={{uri:this.props.image.path}} style={{width: 400, height: 400}}/>
    			</Card>
    		</Page>	





    		);
    }


}