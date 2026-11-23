<script>
	import { enhance } from '$app/forms';

	let { title, intro, submitLabel, pendingLabel, form, next = null, showUsername = false, footer } = $props();
	let pending = $state(false);
</script>

<main id="main-content" class="page auth">
	<section class="card" aria-labelledby="auth-title">
		<h1 id="auth-title">{title}</h1>
		<p class="lead">{intro}</p>

		<form
			method="POST"
			novalidate
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

			{#if showUsername}
				<label for="username">Username <span class="hint">(optional, 3–20 characters)</span></label>
				<input id="username" name="username" type="text" autocomplete="username" minlength="3" maxlength="20" value={form?.username ?? ''} />
			{/if}

			<label for="password">Password {#if showUsername}<span class="hint">(at least 8 characters)</span>{/if}</label>
			<input
				id="password"
				name="password"
				type="password"
				autocomplete={showUsername ? 'new-password' : 'current-password'}
				required
				minlength={showUsername ? 8 : undefined}
			/>

			<button type="submit" disabled={pending} aria-busy={pending}>{pending ? pendingLabel : submitLabel}</button>
		</form>

		<p class="footer">{@render footer()}</p>
	</section>
</main>

<style>
	.auth {
		max-width: 32rem;
	}

	.card {
		padding: var(--space-5);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		box-shadow: var(--shadow);
	}

	h1 {
		margin-top: 0;
	}

	form {
		display: grid;
		gap: var(--space-2);
	}

	label {
		margin-top: var(--space-2);
		font-weight: 600;
	}

	.hint {
		font-weight: 400;
		color: var(--muted);
	}

	input {
		min-height: 44px;
		padding: 0.5rem 0.75rem;
		border: 1px solid #5c5c5c;
		border-radius: 0.5rem;
		background: #fff;
		color: var(--text);
		font: inherit;
	}

	button {
		min-height: 44px;
		margin-top: var(--space-4);
		padding: 0.75rem 1.15rem;
		border: 0;
		border-radius: 999px;
		background: var(--accent);
		color: #fff;
		font: inherit;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background: #7a3b05;
	}

	button:disabled {
		opacity: 0.75;
		cursor: progress;
	}

	.error {
		margin: 0;
		padding: var(--space-3);
		border: 1px solid #8a1c1c;
		border-radius: 0.5rem;
		background: #fdecec;
		color: #8a1c1c;
	}

	.footer {
		margin-bottom: 0;
	}
</style>
