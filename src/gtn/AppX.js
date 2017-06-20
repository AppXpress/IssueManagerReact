import Rest from './Rest';
import { base64Encode } from './Utilities';

/**
 * Authenticate the user with GT Nexus API
 * 
 * @param {string} user the username to authenticate with
 * @param {string} pass the password to authenticate with
 * @param {string} eid the eid to authenticate with
 * @returns true if successful, null otherwise
 */
export async function login(user, pass, eid) {
	var auth = user + ':' + pass;
	if (eid) {
		auth += ':' + eid;
	}

	try {
		var response = await new Rest()
			.base()
			.header('Authorization', 'Basic ' + base64Encode(auth))
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

/**
 * Fetches an instance of an object from the GT Nexus REST API
 * 
 * @param {string} type the object type to get
 * @param {string} uid the uid of the object to get
 * @param {bool?} meta whether or not to fetch full metadata
 * @returns the object in json format, or null on failure
 */
export async function fetch(type, uid, meta) {
	try {
		var query = new Rest()
			.base()
			.path(type)
			.path(uid);

		if (meta) {
			query.path('fetch_with_metadata');
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

export async function fetchAttachList(type, uid) {
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


export async function fetchAttachment(attachUid) {
	try {
		var response = await new Rest()
			.base()
			.path('media')
			.path(attachUid)
			.get();
		if (!response.ok) {
			throw response;
		}

		return await response;
	} catch (error) {
		console.log(error);
	}

}

/**
 * Runs an OQL query on the GT Nexus REST API
 * 
 * @param {string} type the type of object to run the query on
 * @param {string} oql the oql statement to use, or null to get all objects
 * @returns the json query data, or null on failure
 */
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

/**
 * Creates an object on GT Nexus systems
 * 
 * @param {object} data the object data to create
 * @returns the response json, or null on error
 */
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

/**
 * Saves changes in an object to GT Nexus
 * 
 * @param {object} data the data to save
 * @returns the response json, or null on error
 */
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

/**
 * Gets an objects design from GT Nexus REST API
 * 
 * @param {string} type the type of object to get the design for
 * @returns the design json, or null on error
 */
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
