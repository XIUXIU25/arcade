import { api, SESSION_COOKIE } from '#lib/server/api.js';

/** Resolve the logged-in user from the session cookie on every request. */
export async function handle({ event, resolve }) {
	event.locals.user = null;
	event.locals.token = null;

	const token = event.cookies.get(SESSION_COOKIE);
	if (token) {
		const result = await api('GET', '/api/auth/me', { token });
		if (result.ok) {
			event.locals.user = result.data.user;
			event.locals.token = token;
		} else if (result.status === 401) {
			// Expired or logged out elsewhere: forget the dead cookie.
			event.cookies.delete(SESSION_COOKIE, { path: '/' });
		}
		// Any other failure (API asleep or down): keep the cookie, show the user as logged out for this request.
	}

	return resolve(event);
}
