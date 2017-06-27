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
	Button,
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
    upload(){
    	this.props.navigator.pop();
    	this.props.navigator.pop();
    }

    render(){
    	return(
    		<Page>
    			<Card>
    				<Image source={{uri:this.props.image.path}} style={styles.img} />
    				<Button primary onPress={()=>this.upload()} title='Upload' />
    			</Card>
    		</Page>	





    		);
    }


}
const styles = StyleSheet.create({

  img: {
  	width: 350,
  	height: 400,
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
	}
});			