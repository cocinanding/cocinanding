export async function handle({ request, render }) {

	const response = await render(request);

	if ( request.query.has('q') && (typeof response.body === 'string') ) {

		const {count} = JSON.parse(response.body) 

		response.headers[
			'set-cookie'
		] = `q=${request.query.get('q')};count=${count || 0}; Path=/`;
		
	}

	return response
}