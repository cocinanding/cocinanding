<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/recipe/${page.params.id}.json`);
		if (res.ok) {
			return {
				props: { recipe: await res.json() }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load recipe`)
		};
	}	
</script>
<script>
	export let recipe = {};
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

	<h2 class="text-xl sm:text-3xl font-semibold mb-6">
		Ingredients
	</h2>
	<ul class="divide-y text-lg text-gray-700">
		{#each recipe.ingredients as ingredient, index}
			<li class="flex items-center py-2">
<!-- 				<div class="w-16 h-16">
					<img src="{ingredient.image}" class="rounded-xl object-cover w-16 h-16">
				</div> -->
				{ingredient.text}				
			</li>
		{/each}
	</ul>
	
</div>