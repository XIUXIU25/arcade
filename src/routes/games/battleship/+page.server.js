import { fail, redirect } from '@sveltejs/kit';
import { api, errorMessage } from '#lib/server/api.js';

const LOGIN = '/login/?next=/games/battleship/';

/** Never rejects: failures become { error } so the page can render an error state. */
async function fetchGames(token) {
	const result = await api('GET', '/api/games', { token });
	if (result.ok) return { waiting: result.data.waiting, mine: result.data.mine };
	return { error: errorMessage(result.data, 'Could not load games.'), status: result.status };
}

export function load({ locals }) {
	if (!locals.user) redirect(303, LOGIN);
	// Returned as a promise so the page streams in and can show a loading state.
	return { games: fetchGames(locals.token) };
}

export const actions = {
	create: async ({ locals }) => {
		if (!locals.user) redirect(303, LOGIN);
		const result = await api('POST', '/api/games', { token: locals.token });
		if (result.status === 401) redirect(303, LOGIN);
		if (!result.ok) return fail(result.status || 503, { error: errorMessage(result.data), action: 'create' });
		redirect(303, `/games/battleship/${result.data.game.id}/`);
	},

	join: async ({ request, locals }) => {
		if (!locals.user) redirect(303, LOGIN);
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!/^[a-f0-9]{24}$/i.test(id)) return fail(400, { error: 'That game id is not valid.', action: 'join', id });

		const result = await api('POST', `/api/games/${id}/players`, { token: locals.token });
		if (result.status === 401) redirect(303, LOGIN);
		if (!result.ok) return fail(result.status || 503, { error: errorMessage(result.data), action: 'join', id });
		redirect(303, `/games/battleship/${id}/`);
	}
};
