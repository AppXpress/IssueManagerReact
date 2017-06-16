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

export default class Rest {

	static _token;

	static token(value) {
		Rest._token = value;
	}

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

	base() {
		this._url = restUrl;
		this._params['dataKey'] = dataKey;
		this._headers['Authorization'] = Rest._token;
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
		return await this._run('POST', body);
	}
}
