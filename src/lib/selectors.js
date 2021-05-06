function getSelectors (site) {
	const sites = {
		allrecipes: {
	        selDescription: '',
	        selInstructions: 'li.instructions-section-item .section-body p'		
		},
		Food52: {
	        selInstructions: 'li.recipe__list-step'		
		}
	}
	console.log(sites['Food52'])
	return {
		allrecipes: {
	        selDescription: '',
	        selInstructions: 'li.instructions-section-item .section-body p'		
		},
		Food52: {
	        selInstructions: 'li.recipe__list-step'		
		}
	}[site]
}
export default getSelectors
