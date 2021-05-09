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

		return {
			props: { recipe }
		};

	}	
</script>

<script>
	import { onMount } from 'svelte';

	export let recipe = {};
	let recipes = []

	onMount(async () => {

		const healthLabels = recipe.healthLabels.map( el => `health=${el}`).join('&')
		const dietLabels = recipe.dietLabels.map( el => `diet=${el}`).join('&')
		const cuisineType = recipe.cuisineType ? recipe.cuisineType[0] : ''
		const mealType = recipe.mealType ? recipe.mealType[0] : ''
		const dishType = recipe.dishType ? recipe.dishType[0] : ''

		const url = `/recipes.json?q=&from=0&size=4&${dietLabels}&${healthLabels}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}`

		const resSearchRelated = await fetch(url);

		if (resSearchRelated.ok) {
			const result = await resSearchRelated.json();
			recipes = result.hits
		}
	});


</script>

<div class="max-w-screen-sm w-full mx-auto">
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
	<div class="">
		<div>{recipe.yield}</div>
		<div>{recipe.calories}</div>
		{#if recipe.totalTime > 0}
			<div>{recipe.totalTime}</div>
		{/if}
	</div>
	<h2 class="flex items-center text-2xl sm:text-4xl font-semibold mb-6 ">
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

	{#if typeof recipe.intructions === 'object' && recipe.intructions.length }

		<h2 class="flex items-center text-2xl sm:text-4xl font-semibold mb-6 mt-8">
			How to Make It
		</h2>

		<ul class="space-y-2 text-lg text-gray-700">
			{#each recipe.intructions as intructions, index}
				<li class="flex items-center py-2">
					{intructions}				
				</li>
			{/each}
		</ul>
	{/if}

</div>

{#if recipes.length}
	<div class="mt-16">
		<h2 class="text-2xl sm:text-4xl font-semibold mb-6 mt-8">
			Other Recipes You May Like
		</h2>
		<div class="grid grid-cols-4 gap-8">
			{#each recipes as recipe, index}
				<a href="/recipe/{recipe.uri.split('_')[1]}" class="">
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
{/if}