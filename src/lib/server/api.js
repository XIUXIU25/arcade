import { API_URL } from '$app/env/private';

export const SESSION_COOKIE = 'session';

// A sleeping Render free-tier API can take about a minute to wake up.
const TIMEOUT_MS = 60000;

/**
 * Call arcade-api from the SvelteKit server.
 * Never throws: network failures come back as { ok: false, status: 0 } so callers can show an error state.
 */
export async function api(method, path, { token, body, timeout = TIMEOUT_MS } = {}) {
	const headers = { Accept: 'application/json' };
	if (token) headers.Authorization = `Bearer ${token}`;
	if (body !== undefined) headers['Content-Type'] = 'application/json';

	try {
		const response = await fetch(new URL(path, API_URL), {
			method,
			headers,
			body: body === undefined ? undefined : JSON.stringify(body),
			signal: AbortSignal.timeout(timeout)
		});
		const data = await response.json().catch(() => ({}));
		return { ok: response.ok, status: response.status, data };
	} catch (error) {
		// Shows up in the Render logs so the real cause (timeout, DNS, refused connection) is visible.
		console.error(`API call failed: ${method} ${path} -> ${error?.cause?.code ?? error?.name}: ${error?.message}`);
		return { ok: false, status: 0, data: { error: 'Could not reach the game server. Please try again.' } };
	}
}

/** Options for the httpOnly session cookie. */
export function sessionCookieOptions(dev) {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 7
	};
}

/** Turn an API error body into one readable sentence. */
export function errorMessage(data, fallback = 'Something went wrong. Please try again.') {
	if (data?.details?.length) return data.details.map((d) => `${d.path ? `${d.path}: ` : ''}${d.message}`).join('. ');
	return data?.error ?? fallback;
}

/** Only allow same-site relative paths as a post-login destination. */
export function safeNext(value) {
	if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null;
	return value;
}
