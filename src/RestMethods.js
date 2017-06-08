import Rest from './RestBase';

export async function getObjects(identifier) {
	var response = await new Rest()
		.base()
		.path(identifier)
		.path('query')
		.param('oql', '1=1')
		.get();

	return response.json();
}
