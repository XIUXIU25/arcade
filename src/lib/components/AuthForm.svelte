<script>
	import { enhance } from '$app/forms';

	let { title, submitLabel, form, next = null, footer } = $props();
	let pending = $state(false);
</script>

<main id="main-content" class="page auth">
	<h1>{title}</h1>

	<form
		method="POST"
		use:enhance={() => {
			pending = true;
			return async ({ update }) => {
				await update({ reset: false });
				pending = false;
			};
		}}
	>
		{#if next}<input type="hidden" name="next" value={next} />{/if}

		{#if form?.error}
			<p class="error" role="alert">{form.error}</p>
		{/if}

		<label for="email">Email</label>
		<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />

		<label for="password">Password</label>
		<input id="password" name="password" type="password" autocomplete="current-password" required />

		<button type="submit" disabled={pending}>{pending ? 'Please wait…' : submitLabel}</button>
	</form>

	<p>{@render footer()}</p>
</main>

<style>
	.auth {
		max-width: 26rem;
	}

	form {
		display: grid;
		gap: var(--space-2);
	}

	input {
		min-height: 44px;
		padding: 0.5rem 0.75rem;
		border: 1px solid #5c5c5c;
		border-radius: 0.25rem;
		font: inherit;
	}

	button {
		min-height: 44px;
		margin-top: var(--space-3);
		border: 0;
		border-radius: 0.25rem;
		background: var(--accent);
		color: #fff;
		font: inherit;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.75;
		cursor: progress;
	}

	.error {
		margin: 0;
		color: #8a1c1c;
	}
</style>
