<script>
	let { currentPath = '/' } = $props();
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/2048', label: '2048' },
		{ href: '/crossword', label: 'Crossword' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="site-header">
	<nav class="site-nav" aria-label="Primary">
		<a class="site-brand" href="/">Xiuxiu Ying</a>
		<ul class="site-links">
			{#each links as link (link.href)}
				<li><a href={link.href} aria-current={currentPath === link.href ? 'page' : undefined}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.site-header { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--border); background: rgb(255 253 248 / 95%); backdrop-filter: blur(12px); }
	.site-nav { max-width: var(--max-width); margin: 0 auto; padding: var(--space-3) var(--space-4); display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }
	.site-brand { display: inline-flex; min-height: 44px; align-items: center; color: var(--text); font-weight: 700; letter-spacing: 0.02em; text-decoration: none; }
	.site-brand:hover { color: var(--accent-strong); }
	.site-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: var(--space-2); margin: 0; padding: 0; list-style: none; }
	.site-links a { display: inline-flex; min-height: 44px; align-items: center; padding: 0.55rem 0.9rem; border-radius: 999px; color: var(--text); text-decoration: none; transition: color 160ms ease; }
	.site-links a:hover, .site-links a[aria-current='page'] { color: var(--accent-strong); }
	@media (max-width: 42rem) { .site-nav { flex-direction: column; align-items: flex-start; } .site-links { justify-content: flex-start; } }
</style>
