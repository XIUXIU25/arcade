<script>
	import { slide } from 'svelte/transition';
	import CrosswordCell from '#lib/components/CrosswordCell.svelte';

	let { onProgress, children } = $props();
	let letters = $state(Array(25).fill(''));
	let showSolution = $state(false);
	const answers = ['W', 'A', 'T', 'E', 'R', 'A', 'P', 'P', 'L', 'E', 'T', 'R', 'A', 'I', 'N', 'E', 'R', 'A', 'S', '', 'R', 'I', 'N', 'G', ''];
	// The two black squares.
	const blocked = [19, 24];
	// Square index -> clue number shown in the corner.
	const clueNumbers = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 10: 7, 15: 8, 20: 9 };
	const cellLabels = [
		'Row 1, column 1, 1 Across and 1 Down', 'Row 1, column 2, 2 Down', 'Row 1, column 3, 3 Down', 'Row 1, column 4, 4 Down', 'Row 1, column 5, 5 Down',
		'Row 2, column 1, 6 Across', 'Row 2, column 2', 'Row 2, column 3', 'Row 2, column 4', 'Row 2, column 5',
		'Row 3, column 1, 7 Across', 'Row 3, column 2', 'Row 3, column 3', 'Row 3, column 4', 'Row 3, column 5',
		'Row 4, column 1, 8 Across', 'Row 4, column 2', 'Row 4, column 3', 'Row 4, column 4', 'Blocked square',
		'Row 5, column 1, 9 Across', 'Row 5, column 2', 'Row 5, column 3', 'Row 5, column 4', 'Blocked square'
	];
	let filledCount = $derived(countFilled(letters));
	let isSolved = $derived(checkSolved(letters));

	function countFilled(currentLetters) {
		let count = 0;
		for (let i = 0; i < currentLetters.length; i++) {
			if (!blocked.includes(i) && currentLetters[i] !== '') {
				count++;
			}
		}
		return count;
	}

	function checkSolved(currentLetters) {
		for (let i = 0; i < answers.length; i++) {
			if (!blocked.includes(i) && currentLetters[i] !== answers[i]) {
				return false;
			}
		}
		return true;
	}

	function updateLetter(index, value) {
		letters[index] = value;
		onProgress({ filled: filledCount, complete: isSolved });
	}
</script>

<div class="board-layout">
	<div class="board-wrap">
		<div class="crossword-board" aria-label="Mini crossword grid">
			{#each letters as letter, index (index)}
				<CrosswordCell
					{index}
					value={letter}
					isBlock={blocked.includes(index)}
					label={cellLabels[index]}
					number={clueNumbers[index]}
					onLetter={updateLetter}
				/>
			{/each}
		</div>
	</div>

	<div class="clue-columns">{@render children()}</div>
</div>

<label class="reveal-label">
	<input type="checkbox" bind:checked={showSolution} />
	Show solution
</label>

{#if showSolution}
	<section class="solution-panel" aria-labelledby="solution-title" transition:slide>
		<h2 id="solution-title">Solution</h2>
		<p>The completed grid is shown below.</p>
		<div class="crossword-board solution-board" aria-label="Completed crossword grid">
			{#each answers as letter, index (index)}
				<div class="solution-cell" class:block={blocked.includes(index)}>
					{#if clueNumbers[index]}
						<span class="clue-number">{clueNumbers[index]}</span>
					{/if}
					{letter}
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.board-layout {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		align-items: start;
		gap: var(--space-5);
	}

	.board-wrap,
	.clue-columns {
		min-width: 0;
	}

	.crossword-board {
		display: grid;
		width: 100%;
		max-width: 48rem;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		background: #fff;
	}

	.clue-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		gap: 3rem;
	}

	.reveal-label {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		gap: var(--space-2);
	}

	.solution-panel {
		margin-top: var(--space-5);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	.solution-panel h2 {
		margin-bottom: var(--space-2);
	}

	.solution-panel p {
		margin-top: 0;
	}

	.solution-cell {
		position: relative;
		display: flex;
		min-width: 0;
		aspect-ratio: 1;
		align-items: center;
		justify-content: center;
		border: 1px solid #8d8d8d;
		font-size: 1.7rem;
		font-weight: 700;
	}

	.solution-cell.block {
		background: #383838;
	}

	.clue-number {
		position: absolute;
		top: 0.25rem;
		left: 0.28rem;
		font-size: 0.85rem;
		line-height: 1;
	}

	@media (max-width: 56rem) {
		.board-layout {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 42rem) {
		.clue-columns {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.solution-cell {
			font-size: 1.2rem;
		}
	}
</style>
