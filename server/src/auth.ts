import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import { User } from './models/Users';

dotenv.config();

export const createAccessToken = (user: User) => {
	return sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '1440m',
	});
};

// export const createRefreshToken = (user: User) => {
// 	return sign(
// 		{ userID: user.id, tokenVersion: user.tokenVersion },
// 		process.env.REFRESH_TOKEN_SECRET!,
// 		{
// 			expiresIn: '1d',
// 		}
// 	);
// };
