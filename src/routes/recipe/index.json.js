import cheerio from 'cheerio'
import { auth, set as setCache, get as getCache } from '@upstash/redis';

const UPSTASH_REDIS_REST_URL =  import.meta.env.VITE_UPSTASH_REDIS_REST_URL
const UPSTASH_REDIS_REST_TOKEN = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN

export async function get({ query }) {
	const url = query.get('url')

	try {
		auth(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN);		
		let { data: recipe } = await getCache(url)

		if (!recipe) {

		    const response = await fetch( 'http://' + url )
		    const html = await response.text()

			const $ = cheerio.load(html)

			recipe = {
				title: $('.titulo.titulo--articulo').text(),
				image: $('.imagen.lupa').text(),
				ingredients: $('.ingredientes ul li').map((i,el) => $(el).text() ).toArray(),
				instructions: $('.apartado p').map((i,el) => $(el).text() ).toArray(),
			}
			const res = await setCache(url, JSON.stringify(recipe) )
		}

	    return {
			header: {
				'Cache-Control': 'max-age=0, s-maxage=86400'
			},	    	
	    	body: recipe
	    }
	} catch (err) {console.log(err)}
}