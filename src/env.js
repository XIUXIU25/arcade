import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	API_URL: {
		description: 'Base URL of arcade-api. Only the SvelteKit server calls it; the browser never sees it.',
		schema: (value) => {
			try {
				return new URL(value ?? '').origin;
			} catch {
				throw new Error('API_URL must be set to the arcade-api base URL, e.g. http://localhost:3000');
			}
		}
	}
});
