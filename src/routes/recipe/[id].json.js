import HTMLParser from 'fast-html-parser'

import getSelectors from '$lib/selectors'
import { notify } from '$lib/bot'

async function getDetails({ source, url }) {
	try {
		const selectors = getSelectors( source )
		if ( JSON.stringify(selectors) !== JSON.stringify({}) ) {
		    const res = await fetch( url )
		    if (res.ok) {
			    const html = await res.text()
			    var doc = HTMLParser.parse(html);
			    return {
			    	description: !!selectors.selDescription ? doc.querySelector( selectors.selInstructions ).text : '',
			    	intructions: doc.querySelectorAll( selectors.selInstructions ).map( el => el.text ),
			    }
		    }
		} else {
			notify(`source: ${source}, url: ${url}`)
		}
	} catch (e) {
		return {}
	}	

}

export async function get({ params, query }) {
	try {
		const id = params.id.split('-').pop()
	    let uri = `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}`
	    let url = `https://api.edamam.com/search?r=${uri}&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed`
	    const response = await fetch(url)
	    const [recipe] = await response.json()
		
		const details = await getDetails(recipe)

	    return {
	    	body: {...recipe, ...details }
	    }
	} catch (err) {console.log(err)}
}