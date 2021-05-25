<script>
	import { locale,locales } from "$lib/i18n";
</script>

<header class="py-6">
	<a href="/">
		<img src="/cocinanding-logo.jpg" alt="cocinanding logo" class="w-40 mx-auto">
	</a>
    <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select>	
</header>