import { dev } from '$app/environment';
import { fail, redirect } from '@sveltejs/kit';
import { api, errorMessage, SESSION_COOKIE, sessionCookieOptions } from '#lib/server/api.js';

export function load({ locals }) {
	if (locals.user) redirect(303, '/games/battleship/');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');

		if (!email || !password) return fail(400, { error: 'Email and password are required.', email });
		if (password.length < 8) return fail(400, { error: 'Password must be at least 8 characters.', email });

		const result = await api('POST', '/api/auth/signup', { body: { email, password } });
		if (!result.ok) {
			const status = result.status === 0 ? 503 : result.status;
			return fail(status, { error: errorMessage(result.data), email });
		}

		cookies.set(SESSION_COOKIE, result.data.token, sessionCookieOptions(dev));
		redirect(303, '/games/battleship/');
	}
};
