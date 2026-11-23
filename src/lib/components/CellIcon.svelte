<script>
	// Each state has its own shape so hit, miss and sunk never rely on color alone:
	// miss = open ring, hit = starburst, sunk = X inside a solid square, ship = hull.
	let { state } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
	{#if state === 'miss'}
		<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2.5" />
	{:else if state === 'hit'}
		<polygon
			points="12,2 14.5,8.5 21,6 17,12 22,15 15,16 15,22 12,17 9,22 9,16 2,15 7,12 3,6 9.5,8.5"
			fill="currentColor"
		/>
	{:else if state === 'sunk'}
		<rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="currentColor" />
		<path d="M7 7l10 10M17 7L7 17" stroke="var(--cell-bg)" stroke-width="3" stroke-linecap="round" />
	{:else if state === 'ship'}
		<path d="M3 14h18l-3 5H6z M11 4h2v8h-2z" fill="currentColor" />
	{/if}
</svg>

<style>
	svg {
		width: 70%;
		height: 70%;
		display: block;
	}
</style>
