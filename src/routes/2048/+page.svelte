<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { game, keepPlaying, newGame, playMove, restoreGame } from '#lib/game.svelte.js';

	const keyDirections = {
		ArrowUp: 'up',
		ArrowRight: 'right',
		ArrowDown: 'down',
		ArrowLeft: 'left'
	};

	const tileColors = {
		2: '#eff6ff',
		4: '#dbeafe',
		8: '#bfdbfe',
		16: '#93c5fd',
		32: '#60a5fa',
		64: '#3b82f6',
		128: '#2563eb',
		256: '#1d4ed8',
		512: '#1e40af',
		1024: '#1e3a8a',
		2048: '#172554'
	};

	const boardLabel = '2048 game board. Use the arrow keys to move tiles.';

	onMount(restoreGame);

	function handleKeydown(event) {
		const direction = keyDirections[event.key];
		if (direction) {
			event.preventDefault();
			playMove(direction);
		}
	}

	function moveUp() {
		playMove('up');
	}

	function moveDown() {
		playMove('down');
	}

	function moveLeft() {
		playMove('left');
	}

	function moveRight() {
		playMove('right');
	}

	function tileBackground(value) {
		// Tiles above 2048 reuse the darkest colour.
		if (tileColors[value]) {
			return tileColors[value];
		}
		return tileColors[2048];
	}

	function tileTextColor(value) {
		if (value <= 64) {
			return '#1f1f1f';
		}
		return '#ffffff';
	}

	function cellLabel(value) {
		if (value === 0) {
			return 'Empty';
		}
		return String(value);
	}
</script>

<svelte:head>
	<title>Xiuxiu Ying | 2048</title>
	<meta name="description" content="Play 2048 in Xiuxiu Ying's arcade." />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<main id="main-content" class="page">
	<section class="game-page" aria-labelledby="game-title">
		<div class="game-heading">
			<div>
				<p class="lead">The number puzzle</p>
				<h1 id="game-title">2048</h1>
				<p>Join matching tiles to reach 2048. You can keep playing after you win.</p>
			</div>
			<button class="new-game" type="button" onclick={newGame}>New game</button>
		</div>

		<div class="score-row" aria-label="Game scores">
			<div class="score-card"><span>Score</span><strong>{game.score}</strong></div>
			<div class="score-card"><span>Best</span><strong>{game.highScore}</strong></div>
		</div>

		<div class="board-wrap">
			<div class="board" role="grid" aria-label={boardLabel}>
				{#each game.board as row, rowIndex (rowIndex)}
					<div class="board-row" role="row" aria-rowindex={rowIndex + 1}>
						{#each row as tile, columnIndex (columnIndex)}
							<div class="board-cell" role="gridcell" aria-colindex={columnIndex + 1} aria-label={cellLabel(tile)}>
								{#if tile}
									<div
										class="tile"
										class:small-text={tile >= 1024}
										style:background-color={tileBackground(tile)}
										style:color={tileTextColor(tile)}
										transition:scale={{ duration: 140 }}
									>
										{tile}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<p class="keyboard-hint">Use the arrow keys to move the tiles.</p>

		<div class="mobile-controls" role="group" aria-label="Move tiles">
			<button type="button" aria-label="Move tiles up" onclick={moveUp}>↑</button>
			<div class="horizontal-controls">
				<button type="button" aria-label="Move tiles left" onclick={moveLeft}>←</button>
				<button type="button" aria-label="Move tiles down" onclick={moveDown}>↓</button>
				<button type="button" aria-label="Move tiles right" onclick={moveRight}>→</button>
			</div>
		</div>

		{#if game.won}
			<section class="game-message" aria-labelledby="won-heading">
				<h2 id="won-heading">You reached 2048!</h2>
				<p>Congratulations. Continue playing or start a new game.</p>
				<button class="secondary-button" type="button" onclick={keepPlaying}>Keep playing</button>
			</section>
		{:else if game.over}
			<section class="game-message" aria-labelledby="over-heading">
				<h2 id="over-heading">Game over</h2>
				<p>No moves remain. Your score is {game.score}.</p>
				<button class="secondary-button" type="button" onclick={newGame}>Try again</button>
			</section>
		{/if}
		<p class="screen-reader-only" aria-live="polite" aria-atomic="true">{game.announcement}</p>
	</section>
</main>

<style>
	.game-page {
		max-width: 34rem;
		margin: 0 auto;
	}

	.game-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.game-heading h1 {
		margin: 0;
		font-size: 4.5rem;
		line-height: 1;
	}

	.game-heading p {
		margin-bottom: 0;
	}

	.new-game,
	.secondary-button {
		min-height: 44px;
		padding: 0.65rem 1rem;
		border: 0;
		border-radius: 0.6rem;
		background: var(--accent);
		color: #fff;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	.new-game:hover,
	.secondary-button:hover {
		background: var(--accent-strong);
	}

	.score-row {
		display: flex;
		gap: var(--space-3);
		margin: var(--space-5) 0 var(--space-3);
	}

	.score-card {
		display: flex;
		flex-direction: column;
		min-width: 7rem;
		padding: 0.45rem 0.8rem;
		border-radius: 0.6rem;
		background: #d8e5d4;
		text-align: center;
	}

	.score-card span {
		color: #3b463a;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.score-card strong {
		font-size: 1.4rem;
		line-height: 1.3;
	}

	.board-wrap {
		width: 100%;
	}

	.board {
		background: #fff;
	}

	.board-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.board-cell {
		display: flex;
		aspect-ratio: 1;
		min-width: 0;
		border: 1px solid #8d8d8d;
		background: #fff;
	}

	.tile {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: 2.7rem;
		font-weight: 800;
		line-height: 1;
	}

	.tile.small-text {
		font-size: 2rem;
	}

	.keyboard-hint {
		margin: var(--space-3) 0 0;
		color: var(--muted);
		text-align: center;
	}

	.mobile-controls {
		display: none;
		margin-top: var(--space-3);
		text-align: center;
	}

	.mobile-controls button {
		width: 3.5rem;
		height: 3.5rem;
		border: 1px solid #738470;
		border-radius: 0.7rem;
		background: #fff;
		color: var(--text);
		font-size: 1.5rem;
		cursor: pointer;
	}

	.mobile-controls button:hover {
		background: #d8e5d4;
	}

	.horizontal-controls {
		display: flex;
		justify-content: center;
		gap: var(--space-2);
		margin-top: var(--space-2);
	}

	.game-message {
		margin-top: var(--space-4);
		padding: var(--space-4);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
	}

	.game-message h2 {
		margin-top: 0;
	}

	.game-message p {
		margin-top: 0;
		margin-bottom: var(--space-3);
	}

	/* Hidden on screen but still read by screen readers. */
	.screen-reader-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}

	@media (max-width: 42rem) {
		.game-heading {
			align-items: flex-start;
		}

		.game-heading h1 {
			font-size: 3rem;
		}

		.game-heading > div {
			min-width: 0;
		}

		.new-game {
			flex-shrink: 0;
		}

		.tile {
			font-size: 1.6rem;
		}

		.tile.small-text {
			font-size: 1.1rem;
		}

		.mobile-controls {
			display: block;
		}
	}
</style>
