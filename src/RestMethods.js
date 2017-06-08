import Rest from './RestBase';

export async function getObjects(identifier) {
	var response = await (await new Rest().base())
		.path(identifier)
		.path('query')
		.get();

	try {
		return await response.json()
	}
	catch (error) {
		console.log(error);
	}
}
