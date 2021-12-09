import { setCache, getCache } from '$lib/upstash';
import {parseRecipe} from '$lib/parse-recipe'
import { sites } from '$lib/config'

export async function get({ query }) {
	const url = query.get('url')

	try {
		let { data: recipe } = await getCache(url)

		if (!recipe) {
			recipe = await parseRecipe('http://' + url)
			await setCache(url, JSON.stringify(recipe) )
		}
		console.log(recipe)
	    return {
			header: {
				'Cache-Control': 'max-age=0, s-maxage=86400'
			},	    	
	    	body: recipe
	    }

	} catch (err) {
		console.log(err)
		return {
			status: 500,
			body: err
		}
	}
}