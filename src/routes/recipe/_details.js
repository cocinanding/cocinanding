const got = require('got')
const cheerio = require('cheerio')

exports.handler = async (event) => {
    let { url } = event.queryStringParameters;

    const response = await got(url)
    const result = await response.body
    const $ = cheerio.load(result)
    let recipe

    if ( /allrecipes\.com\/recipe/.test(url) ) {
        recipe = {
            title: $('h1.headline').text(),
            description: '',
            url: url,
            lang: '',
            instructions: $('li.instructions-section-item .section-body p').map( (i,el) => $(el).text() ).get(),
            ingredients: $('li.ingredients-item').map( (i,el) => $(el).text().trim() ).get(),
            images: $('.recipe-content-container .lazy-image').map( (i,el) => $(el).data('src').replace(/&#x3D;/,'=') ).get()
        }
    }

    if ( /simplyrecipes\.com\/recipes/.test(url) ) {
        recipe = {
            title: $('h1.heading__title').text(),
            description: '',
            url: url,
            lang: '',
            instructions: $('.structured-project__steps li').map( (i,el) => $(el).text() ).get(),
            ingredients: $('.simple-list__item').map( (i,el) => $(el).text().trim() ).get(),
            images: $('.primary-image').map( (i,el) => $(el).attr('src') ).get()
        }
    }

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*',
        },    
        statusCode: 200,
        body: JSON.stringify(recipe)
	} 

}