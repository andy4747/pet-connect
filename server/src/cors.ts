import { CorsOptions } from 'cors';

const ALLOWED_ORIGINS = [
	'http://localhost:3000',
	'http://localhost:3001',
	'http://127.0.0.1:3000',
	'https://studio.apollographql.com',
];

export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);

		if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
			const msg = `The CORS policy for ${origin} does not allow access from the specified origin lists.`;
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	credentials: true,
};
