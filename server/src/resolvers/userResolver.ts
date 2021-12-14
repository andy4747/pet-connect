import { compare, hash } from 'bcryptjs';
import dotenv from 'dotenv';
import {
	Arg,
	Ctx,
	Field,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { createAccessToken, createRefreshToken } from '../auth';
import { User } from '../models/Users';
import { UserRole } from '../types';
import { UserContext } from '../userContext';
import { isAuth } from './../middlewares/isAuth';

dotenv.config();

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class UserResolver {
	@Query(() => String)
	run() {
		return `Graphql Server is Running at http://localhost:${process.env.APP_PORT}/graphql`;
	}

	@Mutation(() => Boolean)
	async register(
		@Arg('email') email: string,
		@Arg('username') username: string,
		@Arg('password') password: string,
		@Arg('role') role: UserRole
	) {
		const hashedPassword = await hash(password, 12);

		try {
			await User.insert({
				email: email,
				username: username,
				password: hashedPassword,
				role: role,
			});
		} catch (error) {
			console.log(error);
			return false;
		}
		return true;
	}

	@Query(() => String)
	@UseMiddleware(isAuth)
	getMe(@Ctx() { payload }: UserContext) {
		console.log(payload);
		return `Your user id is: ${payload!.userID}`;
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: UserContext
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			throw new Error('User not found');
		}
		const valid = await compare(password, user.password);

		if (!valid) {
			throw new Error('wrong password');
		}

		//login successful
		ctx.res.cookie('refresh_token', createRefreshToken(user), {
			httpOnly: true,
		});

		return {
			accessToken: createAccessToken(user),
		};
	}

	@Query(() => [User])
	users() {
		return User.find();
	}

	@Mutation(() => Boolean)
	async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
		await getConnection()
			.getRepository(User)
			.increment({ id: userId }, 'tokenVersion', 1);

		return true;
	}
}
