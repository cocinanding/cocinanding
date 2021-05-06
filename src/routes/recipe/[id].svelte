<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/recipe/${page.params.id}.json`);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load recipe`)
			};
		}

		const recipe = await res.json();
		// const resSearchRelated = await fetch(`/api/search.json?q=${recipe.label}&size=4`);
		// const recipes = await resSearchRelated.json();

		
		return {
			props: { recipe }
		};

	}	
</script>

<script>
	export let recipe = {};
	export let recipes = [];
</script>

<div class="max-w-screen-md w-full mx-auto">
	<div class="aspect-w-4 aspect-h-3">
		<img 
			src="{recipe.image}" 
			alt="{recipe.label}" 
			class="rounded-2xl object-cover" 
			loading="lazy"
		>	
	</div>
	<h1 class="text-3xl sm:text-5xl font-semibold my-8">
		{recipe.label} 
		<a href={recipe.url} class="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
			<svg class="w-6 h-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
			</svg>			
		</a>
	</h1>
	{recipe.source}
	<h2 class="flex items-center text-xl sm:text-3xl font-semibold mb-6 ">
		<svg class="h-10 w-10 text-gray-400 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
		</svg>		
		Ingredients
	</h2>
	<ul class="divide-y text-lg text-gray-700">
		{#each recipe.ingredients as ingredient, index}
			<li class="flex items-center py-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				{ingredient.text}				
			</li>
		{/each}
	</ul>
	<h2 class="flex items-center text-xl sm:text-3xl font-semibold mb-6 mt-8">
		<svg class="h-10 w-10 text-gray-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
		</svg>		
		How to Make It
	</h2>
	<ul class="space-y-4 text-lg text-gray-700">
		{#each recipe.intructions as intructions, index}
			<li class="flex items-center py-2">
				{intructions}				
			</li>
		{/each}
	</ul>

	
</div>

<div class="mt-16">
	<h2 class="text-2xl sm:text-4xl font-semibold mb-6 mt-8">
		Other Recipes You May Like
	</h2>
	<div class="grid grid-cols-4 gap-8">
		{#each recipes as recipe, index}
			<a use:setCookie={recipe} href="/recipe/{recipe.uri.split('_')[1]}" class="">
				<div class="aspect-w-4 aspect-h-4">
					<img 
						src="{recipe.image}" 
						alt="{recipe.label}" 
						class="rounded-2xl w-full" 
						loading="lazy"
					>	
				</div>
				<h2 class="text-md font-semibold mt-2 text-center text-gray-800">
					{recipe.label}
				</h2>	
			</a>
		{/each}	
	</div>
</div>