export const trailingSlash = 'ignore';
import { redirect } from '@sveltejs/kit';
import { api, SESSION_COOKIE } from '#lib/server/api.js';

export async function POST({ cookies, locals }) {
	// End the session on the API first so the token is dead even if someone copied it.
	if (locals.token) await api('POST', '/api/auth/logout', { token: locals.token });
	cookies.delete(SESSION_COOKIE, { path: '/' });
	redirect(303, '/');
}
