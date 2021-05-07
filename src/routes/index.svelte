<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/api/search.json?q=pollo`);
		if (res.ok) {
			const result = await res.json()
			return {
				props: {
					recipes: result.hits
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load`)
		};
	}	
</script>

<script>

	export let recipes
	let q
	let loading = false


	async function search() {
		loading = true
		const resultByPage = 36 
		const res = await fetch(`/api/search.json?q=${q}&from=0&size=${resultByPage}`);
		if (res.ok) {
			const result = await res.json()
			recipes = result.hits
			localStorage.setItem('q',result.q)
			localStorage.setItem('count',result.count * resultByPage)
		}		
		loading = false
	}

</script>

<form action="" on:submit|preventDefault="{search}"  class="my-6">
	<input 
		type="text" 
		bind:value={q} 
		class="bg-gray-100 w-full p-4 rounded-xl focus:outline-none focus:border-yellow-700 border-2 border-transparent" 
		placeholder="Search for recipes..."
	>
</form>

<div class="grid grid-col-2 sm:grid-cols-3 gap-8">
	{#each recipes as recipe, index}
		<a href="/recipe/{recipe.uri.split('_')[1]}" class="">
			<div class="aspect-w-4 aspect-h-3">
				<img 
					src="{recipe.image}" 
					alt="{recipe.label}" 
					class="rounded-2xl object-cover" 
					loading="lazy"
				>	
			</div>
			<h2 class="text-md font-semibold mt-2 text-center text-gray-800">
				{recipe.label}
			</h2>
			{recipe.source}	
		</a>
	{/each}
</div>
