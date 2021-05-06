function getSelectors (site) {
	return {
		allrecipes: {
	        selDescription: '',
	        selInstructions: 'li.instructions-section-item .section-body p'		
		},
		Food52: {
	        selInstructions: 'li.recipe__list-step'		
		},
		Epicurious: { selInstructions: 'li.preparation-step' }
	}[site]
}

export default getSelectors
