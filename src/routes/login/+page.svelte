<script>
	import { resolve } from '$app/paths';
	import AuthForm from '#lib/components/AuthForm.svelte';

	let { data, form } = $props();
</script>

<svelte:head><title>Log in | Arcade</title></svelte:head>

<AuthForm title="Log in" submitLabel="Log in" {form} next={data.next}>
	{#snippet footer()}
		No account? <a href={resolve('/register')}>Register</a>
	{/snippet}
</AuthForm>
