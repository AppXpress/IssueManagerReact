import Rest from './Rest';
import { base64Encode } from './Utilities';

export async function login(user, pass, eid) {
	var auth = user + ':' + pass;
	if (eid) {
		auth += ':' + eid;
	}

	try {
		var response = await new Rest()
			.base()
			.header('Authorization', base64Encode(auth))
			.get();

		if (!response.ok) {
			throw response;
		}

		Rest.token(response.headers.get('Authorization'));
		return true;
	} catch (error) {
		console.log(error);
	}
}

export async function fetch(type, uid) {
	try {
		var response = await new Rest()
			.base()
			.path(type)
			.path(uid)
			.get();

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAttach(type, uid) {
	try {
		var response = await new Rest()
			.base()
			.path(type)
			.path(uid)
			.path('attachment')
			.get();

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export async function query(type, oql) {
	try {
		var query = new Rest()
			.base()
			.path(type)
			.path('query')

		if (oql) {
			query.param('oql', oql);
		}

		var response = await query.get();

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export async function create(data) {
	try {
		var response = await new Rest()
			.base()
			.path(data.type)
			.post(data);

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export async function persist(data) {
	try {
		var response = await new Rest()
			.base()
			.header('If-Match', data.__metadata.fingerprint)
			.path(data.type)
			.path(data.uid)
			.post(data);

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export async function design(type) {
	try {
		var response = await new Rest()
			.base()
			.path(type)
			.get();

		if (!response.ok) {
			throw response;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
