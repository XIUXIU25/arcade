<script>
	let { index, number, value, isBlock, label, onLetter } = $props();

	function handleInput(event) {
		const letter = event.currentTarget.value.slice(0, 1).toUpperCase();
		onLetter(index, letter);
	}
</script>

<div class="cell" class:block={isBlock} aria-hidden={isBlock}>
	{#if number}
		<span class="clue-number">{number}</span>
	{/if}
	{#if !isBlock}
		<input
			type="text"
			maxlength="1"
			inputmode="text"
			autocomplete="off"
			aria-label={label}
			value={value}
			oninput={handleInput}
		/>
	{/if}
</div>

<style>
	.cell {
		position: relative;
		min-width: 0;
		aspect-ratio: 1;
		border: 1px solid #8d8d8d;
		background: #fff;
	}

	.cell.block {
		background: #383838;
	}

	.cell:focus-within {
		background: #f5f5f5;
	}

	.clue-number {
		position: absolute;
		top: 0.25rem;
		left: 0.28rem;
		font-size: 0.85rem;
		font-weight: 700;
		line-height: 1;
	}

	input {
		width: 100%;
		height: 100%;
		border: 0;
		background: transparent;
		color: var(--text);
		font-size: 1.7rem;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}

	input:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: -3px;
	}

	@media (max-width: 42rem) {
		input {
			font-size: 1.2rem;
		}
	}
</style>
