import {
	AsyncStorage
} from 'react-native';

import dataKey from './dataKey';

export async function getAuthToken(dataKey, username, password, eid) {

	if (eid != '') {
		var toEncode = username + ":" + password + ":" + eid;
	} else {

		var toEncode = username + ":" + password;
	}

	

	let response = await fetch('https://network-rctq.qa.gtnexus.com/rest/310?dataKey=' + dataKey,
		{
			method: "GET",
			headers: {
				"Authorization": base64Encode(toEncode),
				"Content-Type": "application/json"
			}

		});

	return response;

}

export async function getObjects(identifier) {

	var token;

	token = await getToken();
	console.log(token);

	var response;

	response = await fetch('https://network-rctq.qa.gtnexus.com/rest/310/' + identifier + '/query?dataKey=' + dataKey,
		{
			method: "GET",
			headers: {
				"Authorization": token,
				"Content-Type": "application/json"
			},
		});
	return response.json();

}

export async function setToken(authToken) {

	try {
		await AsyncStorage.setItem("authToken", authToken);
	} catch (error) {
		console.log(error);
	}

}

export async function getToken(onResponse) {

	try {
		var result = await AsyncStorage.getItem('authToken');

	} catch (error) {
		console.log(error);
	}

	return result;
}

function base64Encode(toEncode) {

	var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var padding = "";
	var encodedString = "";

	//checking if credential string has length of multiple of 3
	if ((toEncode.length % 3) > 0) {
		var i = (toEncode.length % 3);
		for (; i < 3; i++) {
			padding += "=";
			toEncode += "\0";
		}
	}

	//iterating through all triplets in input string
	for (var i = 0; i < toEncode.length; i += 3) {

		//every triplet gets mapped to a 24 bit number
		var n = (toEncode.charCodeAt(i) << 16) + (toEncode.charCodeAt(i + 1) << 8) + (toEncode.charCodeAt(i + 2));

		//this new number gets seperated into four 6 bit numbers
		n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];

		//use new numbers as indices from base64 char list
		encodedString += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];

	}
	encodedString = encodedString.substring(0, encodedString.length - padding.length) + padding;

	//to create final token add "Basic "

	return "Basic " + encodedString;


}




