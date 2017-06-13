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

var token;

export default class Rest {
	static token;

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
			try {
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
			catch (error) {
				return error;
			}
		}
	}

	async authorize(username, password, eid) {
		var toEncode = username + ':' + password;

		if (eid) {
			toEncode += ':' + eid;
		}

		try {
			var response = await this
				.base()
				.header('Authorization', base64Encode(toEncode))
				.get();

			token = response.headers.get('Authorization');
			return new Boolean(token).valueOf();
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	base() {
		this._url = restUrl;
		this._params['dataKey'] = dataKey;
		this._headers['Authorization'] = token;
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
