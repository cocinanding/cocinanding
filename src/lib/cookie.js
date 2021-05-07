function getCookie(name = ''){
	let cookies = document.cookie
	if (!cookies) return []

	cookies = cookies.split(';').map(ck => {
		const ckArr = ck.split('=')
		return {
			[ ckArr[0] ]: ckArr[1]
		}
	})
	const cookiesObj = Object.assign({}, ...cookies);
	return (!!name) ? cookiesObj[name] : cookiesObj
}

function hasCookie(name) {

}

export { getCookie }