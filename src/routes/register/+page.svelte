<script>
	import { resolve } from '$app/paths';
	import AuthForm from '#lib/components/AuthForm.svelte';

	let { form } = $props();
</script>

<svelte:head><title>Register | Arcade</title></svelte:head>

<AuthForm
	title="Create an account"
	intro="Sign up to challenge other players at Battleship."
	submitLabel="Create account"
	pendingLabel="Creating account…"
	showUsername
	{form}
>
	{#snippet footer()}
		Already have an account? <a href={resolve('/login')}>Log in</a>.
	{/snippet}
</AuthForm>
