function getSelectors (site) {
	return {
		allrecipes: {
	        selDescription: '',
	        selInstructions: 'li.instructions-section-item .section-body p'		
		},
		Food52: {
	        selInstructions: 'li.recipe__list-step'		
		},
		Epicurious: { 
			selInstructions: 'li.preparation-step' 
		},
		"Martha Stewart": { 
			selDescription: '.recipe-summary',
			selInstructions: 'li.instructions-section-item .section-body',
		},
		Saveur: {
			selInstructions: 'li.instruction',
		},
		Chowhound: {
			selInstructions: '.fr_instruction_rec li',
		},
		"Food Republic": {
			selInstructions: '.directions li',
		},
		"LA Times": {
			selInstructions: '.recipe-step-body'
		},
		"My Recipes": {
			selInstructions: '.instructions-section-item .paragraph'
		},
		"Self": {
			selInstructions: '.step-description'
		},
		"Serious Eats": {
			selInstructions: '.structured-project__steps OL LI'
		},
		"PBS Food": {
			selInstructions: '.direction-item'
		},
		"Delish": {
			selInstructions: '.direction-lists li'
		},
		"Food & Wine": {
			selInstructions: '.instructions-section-item .paragraph'
		},
		"EatingWell": {
			selInstructions: '.instructions-section-item'
		},
		"Men's Health": {
			selInstructions: '.direction-lists li'
		},
		"Good Housekeeping": {
			selInstructions: '.direction-lists li'
		},
		"Cookstr": {
			selInstructions: '.stepByStepInstructionsDiv .articleAttrSection'
		},
		"The Daily Meal": {
			selInstructions: '.recipe-preparation p'
		},
		"Goop": {
			selInstructions: '.recipes__instructions p'
		},
		"ethnicfoodsrus.com": {
			selInstructions: '.pf-content ol li'
		},
		"Food & Style": {
			selInstructions: '.instructions ol li'
		},
		"Smitten Kitchen": {
			selInstructions: '.entry-content > p'
		},
		"adishofdailylife.com": {
			selInstructions: '#mpprecipe-instructions-list li'
		},
		"Food Network": {
			selInstructions: '.o-Method__m-Body li'
		},
		"San Francisco Gate": {
			selInstructions: ''
		},
		"Tasting Table": {
			selInstructions: '.recipe-directions li'
		},
		"Rachael Ray": {
			selInstructions: '.recipe-article__directions p'
		},
		"BBC": {
			selInstructions: '.recipe-method__list li'
		},
		"Real Simple": {
			selInstructions: '.instructions-section li'
		},
		"BBC Good Food": {
			selInstructions: '.grouped-list__list li'
		},
		"Honest Cooking": {
			selInstructions: 'li.instruction'
		},
		"ad1": {
			selInstructions: ''
		},
	}[site] || {}
}

export default getSelectors
