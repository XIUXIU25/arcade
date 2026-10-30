<script>
	import { page } from '$app/state';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import favicon from '#lib/assets/favicon.svg';
	import './global.css';

	let { children } = $props();
	let currentPath = $derived(page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Xiuxiu Ying | Arcade</title>
	<meta name="description" content="A small arcade with a mini crossword and puzzle games." />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>
<SiteHeader {currentPath} />
{@render children()}
<SiteFooter message="© 2026 Xiuxiu Ying. All rights reserved." />
