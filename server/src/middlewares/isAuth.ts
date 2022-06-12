import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Payload } from 'types';
import { UserContext } from '../userContext';

export const isAuthCookie: MiddlewareFn<UserContext> = ({ context }, next) => {
	const token = context.req.cookies['stfpcambad'];
	if (!token) {
		throw new Error('please login first');
	}
	try {
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload as any;
	} catch (error) {
		console.log(error);
		throw new Error('user not authenticated');
	}

	return next();
};

export const isAuthREST = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies['stfpcambad'];
	if (!token) {
		return res.status(500).json({ error: 'please login first' });
	}
	try {
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as Payload;
		req.headers['userID'] = String(payload.userID);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'user not authenticated' });
	}

	return next();
};
