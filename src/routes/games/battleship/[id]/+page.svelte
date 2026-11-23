<script>
	import Board from '#lib/components/Board.svelte';

	let { data, form } = $props();
	let game = $derived(data.game);

	const player = $derived(game.you !== null);
	const complete = $derived(game.status === 'complete');

	const message = $derived.by(() => {
		if (complete) {
			if (!player) return `Game over: ${game.players[game.winner]?.username} won.`;
			return game.outcome === 'won' ? 'You won!' : 'You lost.';
		}
		if (game.status === 'waiting') return 'Waiting for an opponent to join.';
		return game.yourTurn ? 'Your turn.' : "Opponent's turn.";
	});
</script>

<svelte:head><title>Battleship game | Arcade</title></svelte:head>

<main id="main-content" class="page">
	<h1>Battleship</h1>
	<p class="message" role="status">{message}</p>

	{#if form?.error}
		<p class="error" role="alert">{form.error}</p>
	{/if}

	<div class="boards">
		{#if player}
			<section aria-labelledby="enemy-h">
				<h2 id="enemy-h">Your shots</h2>
				<Board
					board={game.opponentBoard}
					label="Your shots at the enemy"
					mode={complete ? 'own' : 'target'}
					canFire={game.status === 'active' && game.yourTurn}
				/>
			</section>
			<section aria-labelledby="fleet-h">
				<h2 id="fleet-h">Your board</h2>
				<Board board={game.yourBoard} label="Your board" mode="own" />
			</section>
		{:else}
			<section aria-labelledby="a-h">
				<h2 id="a-h">{game.players[0].username}</h2>
				<Board board={game.yourBoard} label="{game.players[0].username}'s board" mode="own" />
			</section>
			<section aria-labelledby="b-h">
				<h2 id="b-h">{game.players[1]?.username}</h2>
				<Board board={game.opponentBoard} label="{game.players[1]?.username}'s board" mode="own" />
			</section>
		{/if}
	</div>
</main>

<style>
	.boards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: var(--space-5);
	}

	.message {
		font-size: 1.15rem;
		font-weight: 700;
	}

	.error {
		color: #8a1c1c;
	}
</style>
