<script>
	import { navigating, page } from '$app/state';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import favicon from '#lib/assets/favicon.svg';
	import './global.css';

	let { children, data } = $props();
	let currentPath = $derived(page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Xiuxiu Ying | Arcade</title>
	<meta name="description" content="A small arcade with a mini crossword and puzzle games." />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>
<SiteHeader {currentPath} user={data.user} />
{#if navigating.to}
	<p class="nav-status" role="status">Loading…</p>
{/if}
{@render children()}
<SiteFooter message="© 2026 Xiuxiu Ying. All rights reserved." />

<style>
	.nav-status {
		margin: 0;
		padding: var(--space-2) var(--space-4);
		background: var(--accent);
		color: #fff;
		text-align: center;
	}
</style>
