<script>
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import "../app.postcss";
</script>

<script async defer data-website-id="0acc61ba-4bd0-4658-9ee3-b2af32e4ad0a" src="https://umami.dsoto.dev/umami.js"></script>

<div class="min-h-screen">
	<Header/>
	<main >
		<slot/>
	</main>
	<Footer/>
</div>
