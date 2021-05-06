<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/api/search.json?q=pollo`);
		if (res.ok) {
			return {
				props: {
					recipes: await res.json()
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

	async function search() {
		const res = await fetch(`/api/search.json?q=${q}`);
		if (res.ok) {
			recipes = await res.json()
		}		
	}

	function setCookie(a, recipe){
		a.addEventListener('submit', (e) => {
			
		});
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
		<a use:setCookie={recipe} href="/recipe/{recipe.uri.split('_')[1]}" class="">
			<div class="aspect-w-4 aspect-h-3">
				<img 
					src="{recipe.image}" 
					alt="{recipe.label}" 
					class="rounded-2xl" 
					loading="lazy"
				>	
			</div>
			<h2 class="text-md font-semibold mt-2 text-center text-gray-800">
				{recipe.label}
			</h2>	
		</a>
	{/each}
</div>
