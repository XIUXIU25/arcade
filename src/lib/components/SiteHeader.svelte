<script>
	import { resolve } from '$app/paths';
	let { currentPath = '/' } = $props();
	const links = [
		{ path: '/', label: 'Home' },
		{ path: '/2048', label: '2048' },
		{ path: '/crossword', label: 'Crossword' },
		{ path: '/about', label: 'About' },
		{ path: '/contact', label: 'Contact' }
	];

	// Marks the link for the page the visitor is on.
	function currentPage(path) {
		if (currentPath === resolve(path)) {
			return 'page';
		}
		return undefined;
	}
</script>

<header class="site-header">
	<nav class="site-nav" aria-label="Primary">
		<a class="site-brand" href={resolve('/')}>Xiuxiu Ying</a>
		<ul class="site-links">
			{#each links as link (link.path)}
				<li>
					<a href={resolve(link.path)} class:active={currentPage(link.path)} aria-current={currentPage(link.path)}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		border-bottom: 1px solid var(--border);
		background: #fffdf8;
	}

	.site-nav {
		display: flex;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-3) var(--space-4);
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.site-brand {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		color: var(--text);
		font-weight: 700;
		text-decoration: none;
	}

	.site-brand:hover {
		color: var(--accent-strong);
	}

	.site-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.site-links a {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		padding: 0.55rem 0.9rem;
		border-radius: 999px;
		color: var(--text);
		text-decoration: none;
	}

	.site-links a:hover,
	.site-links a.active {
		color: var(--accent-strong);
	}

	@media (max-width: 42rem) {
		.site-nav {
			flex-direction: column;
			align-items: flex-start;
		}

		.site-links {
			justify-content: flex-start;
		}
	}
</style>
