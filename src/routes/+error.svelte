<script>
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>{page.status} | Arcade</title></svelte:head>

<main id="main-content" class="page">
	<h1>{page.status}</h1>
	<p class="lead" role="alert">{page.error?.message ?? 'Something went wrong.'}</p>
	<p>
		<a class="button-link" href={resolve('/games/battleship')}>Back to Battleship</a>
	</p>
</main>
