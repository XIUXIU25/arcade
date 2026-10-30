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
	section { padding: 0; border: 0; background: transparent; }
	h2 { margin: 0 0 var(--space-4); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; line-height: 1; text-transform: uppercase; }
	ol { margin: 0; padding-left: 1.5rem; }
	li { font-size: clamp(1.1rem, 2vw, 1.55rem); line-height: 1.4; }
	li + li { margin-top: var(--space-4); }
	li::marker { font-weight: 800; }
</style>
