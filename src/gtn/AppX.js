import Rest from './Rest';

export async function login(user, pass, eid) {
	try {
		var token = await new Rest().authorize(user, pass, eid);
		return new Boolean(token).valueOf();
	} catch (error) {
		console.log(error);
		return false, error;
	}
}

export async function fetch(type, uid) {
	try {
		var query = await new Rest()
			.base()
			.path(type)
			.path(uid)
			.get();

		return await query.json();
	} catch (error) {
		console.log(error);
		return null, error;
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

		var result = await query.get();
		return await result.json();
	} catch (error) {
		console.log(error);
		return null, error;
	}
}

export async function create(data) {
	try {
		var post = new Rest()
			.base()
			.path(data.type)
			.post(data);
		return await post;
	} catch (error) {
		console.log(error);
		return null, error;
	}
}

export async function persist(data) {
	try {
		var post = new Rest()
			.base()
			.header('If-Match', data.__metadata.fingerprint)
			.path(data.type)
			.path(data.uid)
			.post(data);
		return await post;
	} catch (error) {
		console.log(error);
		return null, error;
	}
}
