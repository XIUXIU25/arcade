<svelte:head><title>Xiuxiu Ying | About</title></svelte:head>

<script>
	import { asset } from '$app/paths';
</script>

<main id="main-content" class="page">
	<section class="about-hero">
		<div>
			<p class="lead">About me</p>
			<h1>Xiu Xiu</h1>
			<p>Hi everyone, I am Xiu Xiu. I am currently a graduate student in computer science at Northeastern University.</p>
		</div>
		<figure class="about-photo">
			<img src={asset('assets/image.png')} alt="Xiuxiu Ying sitting at a table and looking at the camera" />
		</figure>
	</section>

	<section class="about-stack">
		<h2>Experience</h2>
		<p>I am skilled in building scalable web applications, deploying to cloud platforms such as AWS and GCP, and implementing CI/CD automation.</p>
		<p>I like to keep my workflow simple and consistent so the code stays easy to maintain.</p>
	</section>

	<section class="about-meta" aria-labelledby="interests-heading">
		<div>
			<h2 id="interests-heading">Interests</h2>
			<ul><li>Cooking and trying new cuisines</li><li>Hiking</li><li>Travelling</li></ul>
		</div>
	</section>
</main>

<style>
	.about-hero {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		align-items: center;
		gap: var(--space-5);
	}

	.about-hero > div {
		min-width: 0;
	}

	.about-photo {
		margin: 0;
	}

	.about-photo img {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
	}

	.about-stack {
		margin-top: var(--space-5);
	}

	.about-stack h2,
	.about-stack p {
		margin-top: 0;
	}

	.about-meta {
		margin-top: var(--space-5);
	}

	.about-meta h2 {
		margin-top: 0;
	}

	.about-meta ul {
		margin: 0;
		padding-left: 1.2rem;
	}

	@media (max-width: 42rem) {
		.about-hero {
			grid-template-columns: 1fr;
		}
	}
</style>
