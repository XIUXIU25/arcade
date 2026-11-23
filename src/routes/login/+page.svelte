<script>
	import { resolve } from '$app/paths';
	import AuthForm from '#lib/components/AuthForm.svelte';

	let { data, form } = $props();
</script>

<svelte:head><title>Log in | Arcade</title></svelte:head>

<AuthForm
	title="Log in"
	intro="Log in to play Battleship."
	submitLabel="Log in"
	pendingLabel="Logging in…"
	{form}
	next={data.next}
>
	{#snippet footer()}
		New here? <a href={resolve('/register')}>Create an account</a>.
	{/snippet}
</AuthForm>
