import {
	AsyncStorage
} from 'react-native';

import {
	restUrl,
	dataKey
} from './Environment';

import {
	storageGet,
	storageSet,
	base64Encode
} from './Utilities';

/**
 * Builder class for performing REST API queries
 */
export default class Rest {

	static _token;

	static token(value) {
		Rest._token = value;
	}

	/**
	 * Creates a new Rest API call
	 */
	constructor() {
		this._url = '';
		this._params = {};
		this._headers = {};

		/**
		 * Combines path and query parameters into a URL
		 */
		this._getUrl = () => {
			var params = '';

			for (var key in this._params) {
				if (params) {
					params += '&';
				}
				params += key + '=' + this._params[key];
			}

			if (!params) {
				return encodeURI(this._url);
			}

			return encodeURI(this._url + '?' + params);
		}

		/**
		 * Runs a REST query on the system and returns the result
		 */
		this._run = async (method, body) => {
			var args = {
				method: method,
				headers: this._headers
			}

			if (body) {
				if (typeof body == 'string') {
					args.body = body;
				} else {
					args.body = JSON.stringify(body);
				}
			}

			return await fetch(this._getUrl(), args);
		}
	}

	/**
	 * Populates the query with the dataKey and basic headers
	 */
	base() {
		this._url = restUrl;
		this._params['dataKey'] = dataKey;
		this._headers['Authorization'] = Rest._token;
		this._headers['Content-Type'] = 'application/json';
		return this;
	}

	/**
	 * Adds a path to the end of the URL
	 * 
	 * @param {string} dir the path segment to add
	 */
	path(dir) {
		this._url += '/' + dir;
		return this;
	}

	/**
	 * Adds a URL parameter to the query
	 * 
	 * @param {string} key the parameter key
	 * @param {string} value the parameter value
	 */
	param(key, value) {
		this._params[key] = value;
		return this;
	}

	/**
	 * Adds a header to the REST query
	 * 
	 * @param {string} key the header key
	 * @param {string} value the header value
	 */
	header(key, value) {
		this._headers[key] = value;
		return this;
	}

	/**
	 * Asynchronously runs a get API call and returns the result
	 */
	async get() {
		return await this._run('GET');
	}

	/**
	 * Asynchronously runs a post API call and returns the result
	 * 
	 * @param {*} body the body to run the post request with
	 */
	async post(body) {
		return await this._run('POST', body);
	}
}
