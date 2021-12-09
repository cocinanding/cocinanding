export const randomText = () => {
	const q = ['pollo', 'puerco', 'atun', 'carne', 'pescado']
	return q[Math.floor(Math.random() * q.length)]
}

export const sites = [
	'recetasgratis',
	'recetasdeescandalo',
	// 'recetasderechupete',
]