import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    KeyboardAvoidingView,
} from 'react-native';

import {
	Icon,
	Navigation,
	Page,
	Card,
	Button,
	TextInput,
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
		this.state ={
			description: ''
		};

    }
    upload(){
    	this.props.navigator.pop();
    	this.props.navigator.pop();
    }

    render(){
    	return(
    		<Page>
    		<KeyboardAvoidingView behavior='position'>
    			<Card>
    				<Image source={{uri:this.props.image.path}} style={styles.img} />
    				<TextInput
                        label='Description'
                        value={this.state.description}
                        onChangeText={(text) => this.setState({ description: text })}
                        multiline
                        rows={2}
                    />
    				<Button primary onPress={()=>this.upload()} title='Upload' />
    			</Card>
    			</KeyboardAvoidingView>
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
    marginTop: 20,
	}
});			