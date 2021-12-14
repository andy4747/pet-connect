import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { verify } from 'jsonwebtoken';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { createAccessToken, createRefreshToken } from './auth';
import { Config } from './dbConfig';
import { User } from './models/Users';
import { UserResolver } from './resolvers/userResolver';

dotenv.config();

const PORT = process.env.APP_PORT;

(async () => {
	const app = express();
	app.use(
		cors({
			origin: '*',
			credentials: true,
		})
	);
	app.use(cookieParser());
	app.get('/', (_req, res) => {
		res.send('Hello World');
	});
	app.post('/refresh_token', async (req, res) => {
		const token = req.cookies.refresh_token;
		if (!token) {
			res.send({ ok: false, accessToken: '' });
		}
		let payload: any = null;
		try {
			payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
		} catch (error) {
			console.log(error);
			res.send({ ok: false, accessToken: '' });
		}
		const user = await User.findOne({ id: payload.userID });

		if (!user) {
			return res.send({ ok: false, accessToken: '' });
		}

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: '' });
		}

		res.cookie('refresh_token', createRefreshToken(user), {
			httpOnly: true,
		});

		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});
	await createConnection(Config);
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
		}),
		context: ({ req, res }) => ({ req, res }),
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	app.listen(PORT, () => {
		console.log(`Server started at http://localhost:${PORT}`);
	});
})();
