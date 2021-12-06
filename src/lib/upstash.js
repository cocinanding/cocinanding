
const upstashUrl =  import.meta.env.VITE_UPSTASH_REDIS_REST_URL
const token = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN

export const set = async ({ key, value }) => {
	return await api({ key, value, action: 'set' })
}

export const get = async ({ key, value }) => {
	return await api({ key, value, action: 'get' })
}

async function api({ key, value, action }) {

	const options = {
		action: (action === 'set') ? 'POST' : 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: (action === 'set') ? JSON.stringify(value) : undefined
	}

	try {
		const res = await fetch(`${upstashUrl}/get/${key}`, options)
		return await res.json()
	} catch (err) {
		console.log(err)
		return null
	}	

}