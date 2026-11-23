<script>
	import { enhance } from '$app/forms';
	import { BOARD_SIZE, getSunkShips, isValidShot } from '@xiuxiuy/arcade-core';
	import CellIcon from '#lib/components/CellIcon.svelte';

	/**
	 * mode "target": the enemy board. Squares you can still fire at are buttons inside a form.
	 * mode "own": a read-only board (your fleet, or either fleet in a finished game).
	 */
	let { board, label, mode = 'own', canFire = false } = $props();

	const COLUMNS = 'ABCDEFGHIJ';
	const range = Array.from({ length: BOARD_SIZE }, (_, i) => i);
	const key = (x, y) => `${x},${y}`;

	const shots = $derived(new Map(board.shots.map((s) => [key(s.x, s.y), s.hit])));
	const sunkCells = $derived(new Set(getSunkShips(board).flatMap((s) => s.cells.map(([x, y]) => key(x, y)))));
	const shipCells = $derived(new Set(board.ships.flatMap((s) => s.cells.map(([x, y]) => key(x, y)))));

	function stateOf(x, y) {
		const k = key(x, y);
		if (sunkCells.has(k)) return 'sunk';
		if (shots.has(k)) return shots.get(k) ? 'hit' : 'miss';
		if (shipCells.has(k)) return 'ship';
		return 'water';
	}

	const WORDS = {
		water: { own: 'empty water', target: 'not fired at yet' },
		ship: { own: 'ship', target: 'ship' },
		hit: { own: 'hit', target: 'hit' },
		miss: { own: 'miss', target: 'miss' },
		sunk: { own: 'sunk ship', target: 'sunk ship' }
	};

	const describe = (x, y, state) => `${COLUMNS[x]}${y + 1}, ${WORDS[state][mode]}`;

	// Keyboard: one tab stop for the whole grid, arrow keys move between squares.
	let grid = $state();
	let active = $state({ x: 0, y: 0 });

	function onkeydown(event) {
		const move = {
			ArrowRight: [1, 0],
			ArrowLeft: [-1, 0],
			ArrowDown: [0, 1],
			ArrowUp: [0, -1]
		}[event.key];
		let x = active.x;
		let y = active.y;
		if (move) {
			x += move[0];
			y += move[1];
		} else if (event.key === 'Home') x = 0;
		else if (event.key === 'End') x = BOARD_SIZE - 1;
		else return;
		event.preventDefault();
		x = Math.min(BOARD_SIZE - 1, Math.max(0, x));
		y = Math.min(BOARD_SIZE - 1, Math.max(0, y));
		active = { x, y };
		grid?.querySelector(`[data-cell="${key(x, y)}"]`)?.focus();
	}

	function onfocusin(event) {
		const cell = event.target?.dataset?.cell;
		if (cell) {
			const [x, y] = cell.split(',').map(Number);
			active = { x, y };
		}
	}

	let firing = $state(false);
</script>

<figure class="board" class:firing>
	{#if mode === 'target'}
		<form
			method="POST"
			action="?/fire"
			use:enhance={() => {
				firing = true;
				return async ({ update }) => {
					await update();
					firing = false;
				};
			}}
		>
			<div
				class="grid"
				role="grid"
				tabindex="-1"
				aria-label={label}
				aria-rowcount={BOARD_SIZE}
				aria-colcount={BOARD_SIZE}
				bind:this={grid}
				{onkeydown}
				{onfocusin}
			>
					{#each range as y (y)}
					{#each range as x (x)}
						{@const state = stateOf(x, y)}
						{@const fireable = canFire && !firing && isValidShot(board, x, y)}
						<div role="gridcell" class="cell {state}" class:fireable>
							<button
								type={fireable ? 'submit' : 'button'}
								name="cell"
								value={key(x, y)}
								data-cell={key(x, y)}
								tabindex={active.x === x && active.y === y ? 0 : -1}
								aria-disabled={fireable ? undefined : 'true'}
								aria-label={describe(x, y, state) + (fireable ? ', press to fire' : '')}
							>
								<CellIcon {state} />
							</button>
						</div>
					{/each}
				{/each}
			</div>
		</form>
	{:else}
		<div class="grid" role="group" aria-label={label}>
			{#each range as y (y)}
				{#each range as x (x)}
					{@const state = stateOf(x, y)}
					<div class="cell {state}" role="img" aria-label={describe(x, y, state)}>
						<CellIcon {state} />
					</div>
				{/each}
			{/each}
		</div>
	{/if}
</figure>

<style>
	.board {
		margin: 0;
		min-width: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));
		gap: 1px;
		max-width: 30rem;
	}

	.cell {
		--cell-bg: #fff;
		display: flex;
		aspect-ratio: 1;
		align-items: center;
		justify-content: center;
		background: var(--cell-bg);
		outline: 1px solid #c9cfcb;
		outline-offset: 0;
		color: #1d4d5e;
	}

	.cell.ship {
		--cell-bg: #cfd8dc;
		color: #263238;
	}

	.cell.hit {
		--cell-bg: #ffd9c4;
		color: #8a2a00;
	}

	.cell.miss {
		--cell-bg: #fff;
		color: #1d4d5e;
	}

	.cell.sunk {
		--cell-bg: #ffe9e9;
		color: #1f1f1f;
	}

	.cell button {
		display: flex;
		width: 100%;
		height: 100%;
		padding: 0;
		align-items: center;
		justify-content: center;
		border: 0;
		background: transparent;
		color: inherit;
		cursor: not-allowed;
	}

	.cell.fireable button {
		cursor: crosshair;
	}

	.cell.fireable:hover {
		--cell-bg: #fff3b0;
		background: var(--cell-bg);
	}

	.cell button:focus-visible {
		outline: 3px solid #000;
		outline-offset: -3px;
		box-shadow: inset 0 0 0 5px #fff;
	}

	.firing {
		opacity: 0.7;
	}
</style>
