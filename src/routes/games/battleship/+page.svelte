<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { data, form } = $props();
	let busy = $state(null); // 'create' or the id of the game being joined

	const opponentOf = (game) => game.players[game.you === 0 ? 1 : 0];

	function statusOf(game) {
		if (game.status === 'waiting') return 'Waiting for an opponent';
		if (game.status === 'complete') return game.winner === game.you ? 'Finished: you won' : 'Finished: you lost';
		return game.yourTurn ? 'Your turn' : "Opponent's turn";
	}

	const track = (id) => () => {
		busy = id;
		return async ({ update }) => {
			await update();
			busy = null;
		};
	};
</script>

<svelte:head><title>Battleship | Arcade</title></svelte:head>

<main id="main-content" class="page">
	<h1>Battleship</h1>
	{#if form?.error}
		<p class="error" role="alert">{form.error}</p>
	{/if}

	<form method="POST" action="?/create" use:enhance={track('create')}>
		<button type="submit" disabled={busy !== null} aria-busy={busy === 'create'}>
			{busy === 'create' ? 'Creating…' : 'Create a new game'}
		</button>
	</form>

	{#await data.games}
		<p role="status" class="status">Loading games…</p>
	{:then games}
		{#if games.error}
			<div class="error" role="alert">
				<p>{games.error}</p>
				<button type="button" onclick={() => invalidateAll()}>Try again</button>
			</div>
		{:else}
			<section aria-labelledby="waiting-heading">
				<h2 id="waiting-heading">Waiting for a second player</h2>
				{#if games.waiting.length === 0}
					<p class="empty">No games are waiting right now. Create one and wait for someone to join.</p>
				{:else}
					<ul class="games">
						{#each games.waiting as game (game.id)}
							<li>
								<span><strong>{game.players[0]?.username}</strong> is waiting for an opponent</span>
								<form method="POST" action="?/join" use:enhance={track(game.id)}>
									<input type="hidden" name="id" value={game.id} />
									<button type="submit" disabled={busy !== null} aria-busy={busy === game.id}>
										{busy === game.id ? 'Joining…' : 'Join game'}
									</button>
								</form>
							</li>
						{/each}
					</ul>
				{/if}
			</section>

			<section aria-labelledby="mine-heading">
				<h2 id="mine-heading">Your games</h2>
				{#if games.mine.length === 0}
					<p class="empty">You are not in any games yet.</p>
				{:else}
					<ul class="games">
						{#each games.mine as game (game.id)}
							<li>
								<span>
									{#if opponentOf(game)}
										Against <strong>{opponentOf(game).username}</strong>
									{:else}
										No opponent yet
									{/if}
									<span class="badge" class:turn={game.yourTurn}>{statusOf(game)}</span>
								</span>
								<a class="button-link" href={resolve('/games/battleship/[id]', { id: game.id })}>
									{game.status === 'complete' ? 'View' : 'Open'}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/if}
	{/await}
</main>

<style>
	.games {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.games li {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
	}

	.badge {
		display: inline-block;
		margin-left: var(--space-2);
		padding: 0.1rem 0.6rem;
		border: 1px solid var(--muted);
		border-radius: 999px;
		color: var(--text);
		font-size: 0.875rem;
	}

	.badge.turn {
		border-color: var(--accent);
		background: var(--accent);
		color: #fff;
	}

	.empty,
	.status {
		color: var(--muted);
	}

	form {
		margin: 0;
	}

	button {
		min-height: 44px;
		padding: 0.6rem 1.15rem;
		border: 0;
		border-radius: 999px;
		background: var(--accent);
		color: #fff;
		font: inherit;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.75;
		cursor: progress;
	}

	.error {
		padding: var(--space-3) var(--space-4);
		border: 1px solid #8a1c1c;
		border-radius: 0.5rem;
		background: #fdecec;
		color: #8a1c1c;
	}

	.error p {
		margin-top: 0;
	}

	.error button {
		background: #8a1c1c;
	}
</style>
