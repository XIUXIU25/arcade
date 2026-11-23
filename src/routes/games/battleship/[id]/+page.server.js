import { error, fail, redirect } from '@sveltejs/kit';
import { api, errorMessage } from '#lib/server/api.js';

const loginFor = (id) => `/login/?next=/games/battleship/${id}/`;

export async function load({ params, locals }) {
	const result = await api('GET', `/api/games/${params.id}`, { token: locals.token });

	if (result.ok) return { game: result.data.game };
	if (result.status === 401) redirect(303, loginFor(params.id));
	if (result.status === 403) error(403, 'You are not a player in this game, so you cannot view it until it is over.');
	if (result.status === 404 || result.status === 400) error(404, 'That game does not exist.');
	error(503, errorMessage(result.data, 'Could not load the game. Please try again.'));
}

export const actions = {
	fire: async ({ request, params, locals }) => {
		if (!locals.user) redirect(303, loginFor(params.id));

		const form = await request.formData();
		const [x, y] = String(form.get('cell') ?? '').split(',').map((n) => Number.parseInt(n, 10));
		if (!Number.isInteger(x) || !Number.isInteger(y)) return fail(400, { error: 'Pick a square on the enemy board.' });

		const result = await api('POST', `/api/games/${params.id}/shots`, { token: locals.token, body: { x, y } });
		if (result.status === 401) redirect(303, loginFor(params.id));
		if (!result.ok) return fail(result.status || 503, { error: errorMessage(result.data) });

		return { shot: result.data.shot };
	}
};
