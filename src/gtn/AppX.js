import Rest from './Rest';

export async function fetch(type, uid) {
	try {
		var query = await new Rest()
			.base()
			.path(type)
			.path(uid)
			.get();

		return await query.json();
	} catch (error) {
		alert('An error occurred. Please try again later.');
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
			query = query.param('oql', oql);
		}

		query = await query.get();

		return await query.json();
	}
	catch (error) {
		alert('An error occurred. Please try again later.');
		console.log(error);
	}
}

export async function create(type, data) {
	try {
		var post = new Rest()
			.base()
			.path(type)
			.post(data);
		return await post;
	}

	catch (error) {
		alert('An error occured. Please try again later.');
		console.log(error);
	}
}
