<script>
	import { slide } from 'svelte/transition';
	import CrosswordCell from '#lib/components/CrosswordCell.svelte';

	let { onProgress = () => {} } = $props();
	let letters = $state(Array(25).fill(''));
	let showSolution = $state(false);
	const answers = ['W', 'A', 'T', 'E', 'R', 'A', 'P', 'P', 'L', 'E', 'T', 'R', 'A', 'I', 'N', 'E', 'R', 'A', 'S', '', 'R', 'I', 'N', 'G', ''];
	const blocked = new Set([19, 24]);
	const clueStarts = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [10, 7], [15, 8], [20, 9]]);
	const cellLabels = [
		'Row 1, column 1, 1 Across and 1 Down', 'Row 1, column 2, 2 Down', 'Row 1, column 3, 3 Down', 'Row 1, column 4, 4 Down', 'Row 1, column 5, 5 Down',
		'Row 2, column 1, 6 Across', 'Row 2, column 2', 'Row 2, column 3', 'Row 2, column 4', 'Row 2, column 5',
		'Row 3, column 1, 7 Across', 'Row 3, column 2', 'Row 3, column 3', 'Row 3, column 4', 'Row 3, column 5',
		'Row 4, column 1, 8 Across', 'Row 4, column 2', 'Row 4, column 3', 'Row 4, column 4', 'Blocked square',
		'Row 5, column 1, 9 Across', 'Row 5, column 2', 'Row 5, column 3', 'Row 5, column 4', 'Blocked square'
	];
	let filledCount = $derived(letters.filter((letter, index) => !blocked.has(index) && letter).length);
	let isSolved = $derived(answers.every((answer, index) => blocked.has(index) || letters[index] === answer));

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
					isBlock={blocked.has(index)}
					label={cellLabels[index]}
					number={clueStarts.get(index)}
					onLetter={updateLetter}
				/>
			{/each}
		</div>
	</div>

	<div class="clue-columns"><slot /></div>
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
				<div class="solution-cell" class:block={blocked.has(index)} data-number={clueStarts.get(index) || undefined}>
					{letter}
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.board-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr); align-items: start; gap: var(--space-5); }
	.board-wrap { min-width: 0; }
	.crossword-board { display: grid; width: min(100%, 48rem); grid-template-columns: repeat(5, minmax(0, 1fr)); background: #fff; }
	.clue-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: clamp(1.25rem, 5vw, 3rem); }
	.reveal-label { display: inline-flex; min-height: 44px; align-items: center; gap: var(--space-2); }
	.reveal-label input { accent-color: var(--accent); }
	.solution-panel { margin-top: var(--space-5); padding-top: var(--space-5); border-top: 1px solid var(--border); }
	.solution-panel h2 { margin-bottom: var(--space-2); }
	.solution-panel p { margin-top: 0; }
	.solution-board .solution-cell { position: relative; display: flex; aspect-ratio: 1; align-items: center; justify-content: center; border: 1px solid #8d8d8d; font-size: clamp(1.2rem, 3vw, 1.7rem); font-weight: 700; }
	.solution-cell[data-number]::before { position: absolute; top: 0.25rem; left: 0.28rem; font-size: 0.85rem; line-height: 1; content: attr(data-number); }
	.solution-cell.block { background: #383838; }
	@media (max-width: 56rem) { .board-layout { grid-template-columns: 1fr; } }
	@media (max-width: 42rem) { .clue-columns { grid-template-columns: 1fr; } }
</style>
