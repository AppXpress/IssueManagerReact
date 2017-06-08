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

export async function authorize(username, password, eid) {
	var toEncode = username + ':' + password;

	if (eid) {
		toEncode += ':' + eid;
	}

	var response = await (await new Rest().base())
		.header('Authorization', base64Encode(toEncode))
		.get();

	if (!response) {
		return false;
	}

	await storageSet('token', response.headers.get('Authorization'));
	return true;
}

export default class Rest {
	constructor() {
		this._url = '';
		this._params = {};
		this._headers = {};

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

		this._run = async (method) => {
			try {
				return await fetch(this._getUrl(), {
					method: method,
					headers: this._headers
				});
			}
			catch (error) {
				return error;
			}
		}
	}

	async base() {
		this._url = restUrl;
		this._params['dataKey'] = dataKey;
		this._headers['Authorization'] = await storageGet('token');
		this._headers['Content-Type'] = 'application/json';
		return this;
	}

	path(dir) {
		this._url += '/' + dir;
		return this;
	}

	param(key, value) {
		this._params[key] = value;
		return this;
	}

	header(key, value) {
		this._headers[key] = value;
		return this;
	}

	async get() {
		return await this._run('GET');
	}

	async post(body) {
		// implement body
		return await this._run('POST');
	}
}
