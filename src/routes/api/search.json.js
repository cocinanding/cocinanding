// const got = require('got')

export async function get({ params, query }) {
    // let {q, from = 0, to = 36, lang = 'en', dishtype, mealType} = event.queryStringParameters;

    const q = query.get('q') || 'pollo'
    const lang = query.get('lang') || 'en'
    const from = query.get('from') || '0'
    const to = query.get('to') || '36'

    const app = process.env.EDEMAM_APP
    const key = process.env.EDEMAM_KEY

    const hostname = lang === 'es' ? 'test-es' : 'api'

    let url = `https://${hostname}.edamam.com/search?q=${q}&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed&from=${from}&to=${to}`
    // url += !!dishtype ? `&dishType=${dishtype}` : ''
    // url += !!mealType ? `&mealType=${mealType}` : ''

    const response = await fetch(url)
    const { hits } = await response.json()
    
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: !!hits ? hits.map( el => el.recipe ) : []
    }

}