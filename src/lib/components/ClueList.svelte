<script>
	let { title, clues } = $props();
</script>

<section aria-label={title}>
	<h2>{title}</h2>
	<ol>
		{#each clues as clue (clue.number)}
			<li value={clue.number}>{clue.text}</li>
		{/each}
	</ol>
</section>

<style>
	h2 {
		margin: 0 0 var(--space-4);
		font-size: 2.8rem;
		font-weight: 900;
		line-height: 1;
		text-transform: uppercase;
	}

	ol {
		margin: 0;
		padding-left: 1.5rem;
	}

	li {
		margin-bottom: var(--space-4);
		font-size: 1.55rem;
		line-height: 1.4;
	}

	@media (max-width: 42rem) {
		h2 {
			font-size: 1.8rem;
		}

		li {
			font-size: 1.1rem;
		}
	}
</style>
