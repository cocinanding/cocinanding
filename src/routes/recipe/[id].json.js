import getSelectors from '$lib/selectors'
import cheerio from 'cheerio'

export async function get({ params, query }) {
	try {

	    let uri = `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${params.id}`
	    let url = `https://api.edamam.com/search?r=${uri}&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed`
	    const response = await fetch(url)
	    const [recipe] = await response.json()

		const selectors = getSelectors( recipe.source )
		let details = {}

		if ( !!selectors ) {
		    const res = await fetch(recipe.url)
		    const html = await res.text()
		    const $ = cheerio.load(html)
		    details = {
		    	description: !!selectors.selDescription ? $(selectors.selDescription).html() : '',
		    	intructions: $(selectors.selInstructions).map( (i,el) => $(el).text().trim() ).get(),
		    }
		}

	    return {
	    	body: {...recipe, ...details }
	    }
	} catch (err) {console.log(err)}
}