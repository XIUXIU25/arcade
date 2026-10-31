<script>
	import ClueList from '#lib/components/ClueList.svelte';
	import CrosswordBoard from '#lib/components/CrosswordBoard.svelte';

	let progress = $state({ filled: 0, complete: false });
	let progressMessage = $derived(getProgressMessage(progress));

	const across = [
		{ number: 1, text: 'H2O' },
		{ number: 6, text: 'Mac or Granny Smith' },
		{ number: 7, text: 'Rail vehicle' },
		{ number: 8, text: 'Historic periods' },
		{ number: 9, text: 'Circle jewelry' }
	];
	const down = [
		{ number: 1, text: 'Liquid need' },
		{ number: 2, text: 'Fruit brand or fruit' },
		{ number: 3, text: 'Teach repeatedly' },
		{ number: 4, text: 'Time periods' },
		{ number: 5, text: 'Doorbell sound' }
	];

	function getProgressMessage(currentProgress) {
		if (currentProgress.complete) {
			return 'Puzzle complete. Nice work!';
		}
		return currentProgress.filled + ' of 23 squares filled.';
	}

	function updateProgress(nextProgress) {
		progress = nextProgress;
	}
</script>

<svelte:head><title>Xiuxiu Ying | Crossword</title></svelte:head>

<main id="main-content" class="page">
	<section class="game-intro content">
		<p class="lead">Mini crossword</p>
		<h1>Type one letter into each open square.</h1>
		<p>This is a small 5 by 5 crossword. Use the checkbox to reveal the solution on keyboard or touch devices.</p>
	</section>

	<section class="game-section" aria-labelledby="play-heading">
		<h2 id="play-heading">Play the puzzle</h2>
		<CrosswordBoard onProgress={updateProgress}>
			<ClueList title="Across" clues={across} />
			<ClueList title="Down" clues={down} />
		</CrosswordBoard>
		<p class="progress" aria-live="polite">{progressMessage}</p>
	</section>
</main>

<style>
	.game-intro {
		max-width: 46rem;
	}

	.game-section {
		margin-top: var(--space-5);
	}

	.progress {
		margin-top: var(--space-4);
		color: var(--muted);
	}
</style>
