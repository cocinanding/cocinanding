function getSelectors (site) {
	// const sites = {
	// 	allrecipes: {
	//         selDescription: '',
	//         selInstructions: 'li.instructions-section-item .section-body p'		
	// 	},
	// 	Food52: {
	//         selInstructions: 'li.recipe__list-step'		
	// 	},
	// 	Epicurious: { selInstructions: 'li.preparation-step' }
	// }
	// console.log(sites['Food52'])
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
