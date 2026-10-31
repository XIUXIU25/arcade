<svelte:head><title>Xiuxiu Ying | Home</title></svelte:head>

<script>
	import { resolve, asset } from '$app/paths';
</script>

<main id="main-content" class="page">
	<section class="hero">
		<div class="hero-copy content">
			<p class="lead">Xiuxiu Ying’s arcade</p>
			<h1>Welcome to my mini game site.</h1>
			<p>I built this project for class. The crossword is back, and 2048 is joining the arcade.</p>
			<a class="button-link" href={resolve('/crossword')}>Play the crossword</a>
		</div>
		<img class="hero-art" src={asset('assets/puzzle.png')} alt="A simple square grid illustration" />
	</section>

	<section aria-labelledby="games-heading">
		<h2 id="games-heading">Choose a game</h2>
		<ul class="feature-grid">
			<li>
				<h3>Mini crossword</h3>
				<p>Fill the five by five grid using the across and down clues.</p>
				<a href={resolve('/crossword')}>Open the crossword</a>
			</li>
			<li>
				<h3>2048</h3>
				<p>Slide numbered tiles and combine matching values.</p>
				<a href={resolve('/2048')}>Open 2048</a>
			</li>
		</ul>
	</section>
</main>

<style>
	.hero {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
	}

	.hero-copy {
		max-width: 34rem;
	}

	.hero-copy h1 {
		margin: 0 0 var(--space-4);
		font-size: 3.4rem;
		line-height: 1.1;
	}

	.hero-copy p {
		margin: 0 0 var(--space-4);
	}

	.hero-art {
		width: 18rem;
		max-width: 100%;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.feature-grid li {
		min-width: 0;
		padding: var(--space-4);
		border: 1px solid var(--border);
		border-radius: 0.9rem;
		background: var(--surface-alt);
	}

	.feature-grid h3 {
		margin: 0 0 var(--space-2);
		font-size: 1rem;
	}

	.feature-grid p {
		margin: 0 0 var(--space-3);
	}

	@media (max-width: 48rem) {
		.hero-copy h1 {
			font-size: 2.1rem;
		}

		.hero-art {
			width: 16rem;
		}

		.feature-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
