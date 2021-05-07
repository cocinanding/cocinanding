import getSelectors from '$lib/selectors'
import cheerio from 'cheerio'

async function getDetails({ source, url }) {
	try {
		const selectors = getSelectors( source )

		if ( !!selectors ) {
		    const res = await fetch( url )
		    if (res.ok) {
			    const html = await res.text()
			    const $ = cheerio.load(html)
			    return {
			    	description: !!selectors.selDescription ? $(selectors.selDescription).html() : '',
			    	intructions: $(selectors.selInstructions).map( (i,el) => $(el).text().trim() ).get(),
			    }
		    }
		}
	} catch (e) {
		return {}
	}	

}

export async function get({ params, query }) {
	try {

	    let uri = `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${params.id}`
	    let url = `https://api.edamam.com/search?r=${uri}&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed`
	    const response = await fetch(url)
	    const [recipe] = await response.json()
		
		const details = await getDetails(recipe)

	    return {
	    	body: {...recipe, ...details }
	    }
	} catch (err) {console.log(err)}
}