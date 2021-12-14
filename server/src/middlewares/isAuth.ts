import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { UserContext } from '../userContext';

export const isAuth: MiddlewareFn<UserContext> = ({ context }, next) => {
	const authorization = context.req.headers['authorization'];
	if (!authorization) {
		throw new Error('Enter access token in request header');
	}
	try {
		const token = authorization.split(' ')[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload as any;
	} catch (error) {
		console.log(error);
		throw new Error('user not authenticated');
	}

	return next();
};
