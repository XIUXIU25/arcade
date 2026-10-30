<script>
	let { index, number, value, isBlock, label, onLetter } = $props();
</script>

<div class="cell" class:block={isBlock} data-number={number || undefined}>
	{#if !isBlock}
		<input
			type="text"
			maxlength="1"
			inputmode="text"
			autocomplete="off"
			aria-label={label}
			value={value}
			oninput={(event) => onLetter(index, event.currentTarget.value.toUpperCase().slice(0, 1))}
		/>
	{/if}
</div>

<style>
	.cell { position: relative; aspect-ratio: 1; border: 1px solid #8d8d8d; background: #fff; }
	.cell[data-number]::before { position: absolute; top: 0.25rem; left: 0.28rem; font-size: 0.85rem; font-weight: 700; line-height: 1; content: attr(data-number); }
	.cell.block { background: #383838; }
	input { width: 100%; height: 100%; border: 0; background: transparent; color: var(--text); font-size: clamp(1.2rem, 3vw, 1.7rem); font-weight: 700; text-align: center; text-transform: uppercase; caret-color: var(--accent); }
	input:focus-visible { outline: 3px solid var(--accent); outline-offset: -3px; }
	.cell:focus-within { background: #f5f5f5; }
</style>
