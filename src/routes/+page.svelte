<svelte:head><title>Xiuxiu Ying | Home</title></svelte:head>

<main id="main-content" class="page">
	<section class="hero">
		<div class="hero-copy content">
			<p class="lead">Xiuxiu Ying’s arcade</p>
			<h1>Welcome to my mini game site.</h1>
			<p>I built this project for class. The crossword is back, and 2048 is joining the arcade.</p>
			<a class="button-link" href="/crossword">Play the crossword</a>
		</div>
		<img class="hero-art" src="/assets/puzzle.png" alt="A simple square grid illustration" />
	</section>

	<section aria-labelledby="games-heading">
		<h2 id="games-heading">Choose a game</h2>
		<ul class="feature-grid">
			<li>
				<h3>Mini crossword</h3>
				<p>Fill the five by five grid using the across and down clues.</p>
				<a href="/crossword">Open the crossword</a>
			</li>
			<li>
				<h3>2048</h3>
				<p>Slide numbered tiles and combine matching values.</p>
				<a href="/2048">Open 2048</a>
			</li>
		</ul>
	</section>
</main>

<style>
	.hero { display: flex; align-items: center; justify-content: space-between; gap: var(--space-6); flex-wrap: wrap; }
	.hero-copy { max-width: 34rem; }
	.hero-copy h1 { margin: 0; font-size: clamp(2.1rem, 4vw, 3.4rem); line-height: 1.1; }
	.hero-copy p { margin: 0; }
	.hero-copy > * + * { margin-top: var(--space-4); }
	.hero-art { width: min(18rem, 100%); }
	.feature-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-4); margin: 0; padding: 0; list-style: none; }
	.feature-grid li { padding: var(--space-4); border: 1px solid var(--border); border-radius: 0.9rem; background: var(--surface-alt); }
	.feature-grid h3 { margin: 0 0 var(--space-2); font-size: 1rem; }
	.feature-grid p { margin: 0 0 var(--space-3); }
	@media (max-width: 48rem) { .feature-grid { grid-template-columns: 1fr; } .hero-art { width: min(100%, 16rem); } }
</style>
