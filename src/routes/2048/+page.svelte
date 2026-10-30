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
		if (!direction) return;
		event.preventDefault();
		playMove(direction);
	}

	function moveTiles(direction) {
		playMove(direction);
	}

	function tileStyle(value) {
		const background = tileColors[value] ?? '#172554';
		const foreground = value <= 64 ? '#1f1f1f' : '#ffffff';
		return `--tile-background: ${background}; --tile-foreground: ${foreground};`;
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
							<div class="board-cell" role="gridcell" aria-colindex={columnIndex + 1} aria-label={tile ? String(tile) : 'Empty'}>
								{#if tile}
									<div class="tile" style={tileStyle(tile)} transition:scale={{ duration: 140 }}>
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
			<button type="button" aria-label="Move tiles up" onclick={() => moveTiles('up')}>↑</button>
			<div class="horizontal-controls">
				<button type="button" aria-label="Move tiles left" onclick={() => moveTiles('left')}>←</button>
				<button type="button" aria-label="Move tiles down" onclick={() => moveTiles('down')}>↓</button>
				<button type="button" aria-label="Move tiles right" onclick={() => moveTiles('right')}>→</button>
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
	.game-page { max-width: 34rem; margin: 0 auto; }
	.game-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--space-4); }
	.game-heading h1 { margin: 0; font-size: clamp(2.8rem, 11vw, 4.5rem); line-height: 1; }
	.game-heading p { margin-bottom: 0; }
	.new-game, .secondary-button { min-height: 44px; padding: 0.65rem 1rem; border: 0; border-radius: 0.6rem; background: var(--accent); color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
	.new-game:hover, .secondary-button:hover { background: var(--accent-strong); }
	.score-row { display: flex; gap: var(--space-3); margin: var(--space-5) 0 var(--space-3); }
	.score-card { display: grid; min-width: 7rem; padding: 0.45rem 0.8rem; border-radius: 0.6rem; background: #d8e5d4; text-align: center; }
	.score-card span { color: #3b463a; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; }
	.score-card strong { font-size: 1.4rem; line-height: 1.3; }
	.board-wrap { width: 100%; padding: 0.5rem; border-radius: 0.8rem; background: #879a83; box-shadow: var(--shadow); }
	.board { display: grid; gap: 0.5rem; }
	.board-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.5rem; }
	.board-cell { display: grid; aspect-ratio: 1; min-width: 0; place-items: stretch; border-radius: 0.35rem; background: #d8e2d5; }
	.tile { display: grid; place-items: center; border-radius: inherit; background: var(--tile-background); color: var(--tile-foreground); font-size: clamp(1.45rem, 8vw, 2.7rem); font-weight: 800; line-height: 1; }
	.board-cell[aria-label='1024'] .tile, .board-cell[aria-label='2048'] .tile { font-size: clamp(1.05rem, 6vw, 2rem); }
	.keyboard-hint { margin: var(--space-3) 0 0; color: var(--muted); text-align: center; }
	.mobile-controls { display: none; margin-top: var(--space-3); text-align: center; }
	.mobile-controls button { width: 3.5rem; height: 3.5rem; border: 1px solid #738470; border-radius: 0.7rem; background: #fff; color: var(--text); font-size: 1.5rem; cursor: pointer; }
	.mobile-controls button:hover { background: #d8e5d4; }
	.horizontal-controls { display: flex; justify-content: center; gap: var(--space-2); margin-top: var(--space-2); }
	.game-message { margin-top: var(--space-4); padding: var(--space-4); border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
	.game-message h2, .game-message p { margin-top: 0; }
	.game-message p { margin-bottom: var(--space-3); }
	.screen-reader-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }
	@media (max-width: 42rem) {
		.game-heading { align-items: flex-start; }
		.game-heading > div { min-width: 0; }
		.game-heading > div p:last-child { max-width: 34ch; }
		.new-game { flex: 0 0 auto; }
		.mobile-controls { display: block; }
	}
</style>
