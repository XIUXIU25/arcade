<script>
	import { resolve } from '$app/paths';
	import AuthForm from '#lib/components/AuthForm.svelte';

	let { form } = $props();
</script>

<svelte:head><title>Register | Arcade</title></svelte:head>

<AuthForm title="Register" submitLabel="Register" {form}>
	{#snippet footer()}
		Have an account? <a href={resolve('/login')}>Log in</a>
	{/snippet}
</AuthForm>
