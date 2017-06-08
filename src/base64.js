export default function base64Encode(toEncode) {

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
