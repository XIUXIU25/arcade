import { dev } from '$app/environment';
import { fail, redirect } from '@sveltejs/kit';
import { api, errorMessage, safeNext, SESSION_COOKIE, sessionCookieOptions } from '#lib/server/api.js';

export function load({ locals, url }) {
	if (locals.user) redirect(303, '/games/battleship/');
	return { next: safeNext(url.searchParams.get('next')) };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		const next = safeNext(String(form.get('next') ?? '')) ?? safeNext(url.searchParams.get('next'));

		if (!email || !password) return fail(400, { error: 'Enter your email and password.', email });

		const result = await api('POST', '/api/auth/login', { body: { email, password } });
		if (!result.ok) {
			const status = result.status === 0 ? 503 : result.status;
			return fail(status, { error: errorMessage(result.data), email });
		}

		cookies.set(SESSION_COOKIE, result.data.token, sessionCookieOptions(dev));
		redirect(303, next ?? '/games/battleship/');
	}
};
