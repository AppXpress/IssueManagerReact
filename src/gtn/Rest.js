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

import RNFetchBlob from 'react-native-fetch-blob'

const Fetch = RNFetchBlob.polyfill.Fetch

window.fetch = new Fetch({
	auto: true,
	binaryContentTypes: ['image/']
}).build()

/**
 * Builder class for performing REST API queries
 */
export default class Rest {

	static _token;
	static _credentials;

	/**
	 * Sets the login credentials for rest calls
	 * 
	 * @param {string} user the username
	 * @param {string} pass the password
	 * @param {string} eid the eidentity
	 */
	static credentials(user, pass, eid) {
		var auth = user + ':' + pass;
		if (eid) {
			auth += ':' + eid;
		}

		Rest._credentials = base64Encode(auth);
	}

	/**
	 * Runs the authentication rest call on the system
	 * 
	 * @returns an object with the rest results
	 */
	static async authenticate() {
		try {
			var response = await new Rest()
				.base()
				.header('Authorization', 'Basic ' + Rest._credentials)
				.get();

			if (!response.ok) {
				throw response;
			}

			Rest._token = response.info().headers.Authorization;
			return { data: true };
		} catch (error) {
			console.warn(error);
			return { error: error }
		}
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
			var config = {};

			if (this._ext) {
				config = {
					fileCache: true,
					appendExt: this._ext
				};
			}

			var result = await RNFetchBlob.config(config)
				.fetch(method, this._getUrl(), this._headers, body);

			if (result.info().status == 401) {
				await Rest.authenticate();
				result = await RNFetchBlob.fetch(method, this._getUrl(), this._headers, body);
			}

			result.ok = result.info().status >= 200 && result.info().status < 300;

			return result;
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
	 * Saves the response body with the specified file extension
	 * 
	 * @param {string} ext the extension to use
	 */
	fileExt(ext) {
		this._ext = ext;
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
