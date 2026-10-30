<script>
	let { message = 'Enjoy the games!' } = $props();
</script>

<footer class="footer"><p>{message}</p></footer>

<style>
	.footer { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--space-4) var(--space-6); color: var(--muted); }
</style>
