import { compare, hash } from 'bcryptjs';
import dotenv from 'dotenv';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from 'stream';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';
import { UserRole } from '../../../types';
import { createAccessToken } from '../../auth';
import { isAuthCookie } from '../../middlewares/isAuth';
import { Follow } from '../../models/Follows';
import { Post } from '../../models/Posts';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';
import { LoginData, ProfileData, VendorConversion } from './userGQL';

dotenv.config();

interface Upload {
	filename: string;
	mimetype: string;
	encoding: string;
	createReadStream: () => Stream;
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

		if (!email || !username || !password || !role) {
			return false;
		}
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

	@Mutation(() => LoginData)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: UserContext
	): Promise<LoginData> {
		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			return {
				accessToken: '',
			};
		}
		const valid = await compare(password, user.password);

		if (!valid) {
			return {
				accessToken: '',
			};
		}

		const accessToken = createAccessToken(user);

		ctx.res.cookie('stfpcambad', accessToken, {
			httpOnly: true,
			maxAge: 86400000,
		});

		return {
			accessToken: accessToken,
		};
	}

	@Query(() => [User])
	users() {
		return User.find();
	}

	@Query(() => User)
	@UseMiddleware(isAuthCookie)
	async me(@Ctx() { payload }: UserContext) {
		return User.findOne({ where: { id: payload!.userID } });
	}

	@Query(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async isVendor(@Ctx() { payload }: UserContext) {
		const user = await User.findOne({ where: { id: payload!.userID } });
		if (!user) {
			return false;
		}
		if (user.role === 'org') return true;
		return false;
	}

	@Mutation(() => VendorConversion)
	async convertToVendor(
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		try {
			const userRepo = getRepository(User);
			const user = await userRepo.findOne({
				where: { email: email },
			});
			if (!user) {
				return {
					status: false,
					message: "user doesn't exists",
				};
			}
			const valid = await compare(password, user.password);

			if (!valid) {
				return {
					status: false,
					message: 'incorrect password',
				};
			}
			user.role = 'org';
			await userRepo.save(user);
			return {
				status: true,
				message: 'user converted to vendor',
			};
		} catch (error) {
			return {
				status: false,
				message: 'server error occured',
			};
		}
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async logout(@Ctx() { res }: UserContext) {
		try {
			res.clearCookie('stfpcambad');
			return true;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async uploadProfile(
		@Arg('picture', () => GraphQLUpload) { createReadStream, filename }: Upload
	) {
		return new Promise(async (resolve, reject) =>
			createReadStream()
				.pipe(createWriteStream(__dirname + `../../uploads/${filename}`))
				.on('finish', () => resolve(true))
				.on('error', () => reject(false))
		);
	}

	@Query(() => ProfileData)
	@UseMiddleware(isAuthCookie)
	async getProfileData(@Ctx() { payload }: UserContext) {
		const user = await User.findOne({ where: { id: payload!.userID } });
		if (!user) {
			throw new Error('user not found');
		}
		const posts = await Post.find({ where: { id: user.id } });
		const followers = await Follow.find({ where: { userId: user.id } });
		const following = await Follow.find({ where: { followerId: user.id } });
		let followerUsers: User[] = [];
		for (const follow of followers) {
			const user = await User.findOne(follow.followerId);
			if (!followerUsers.some((followerUser) => followerUser.id === user!.id)) {
				followerUsers.push(user!);
			}
		}
		//following
		let followingUsers: User[] = [];
		for (const follow of following) {
			const user = await User.findOne(follow.followerId);
			if (
				!followingUsers.some((followingUser) => followingUser.id === user!.id)
			) {
				followingUsers.push(user!);
			}
		}
		const profileData: ProfileData = {
			posts: posts,
			followers: followerUsers,
			following: followingUsers,
		};
		return profileData;
	}

	@Query(() => ProfileData)
	@UseMiddleware(isAuthCookie)
	async getUserProfile(@Arg('username') username: string) {
		const user = await User.findOne({ where: { username: username } });
		if (!user) {
			throw new Error('user not found');
		}
		const posts = await Post.find({ where: { id: user.id } });
		const followers = await Follow.find({ where: { userId: user.id } });
		const following = await Follow.find({ where: { followerId: user.id } });
		let followerUsers: User[] = [];
		for (const follow of followers) {
			const user = await User.findOne(follow.followerId);
			if (!followerUsers.some((followerUser) => followerUser.id === user!.id)) {
				followerUsers.push(user!);
			}
		}
		//following
		let followingUsers: User[] = [];
		for (const follow of following) {
			const user = await User.findOne(follow.followerId);
			if (
				!followingUsers.some((followingUser) => followingUser.id === user!.id)
			) {
				followingUsers.push(user!);
			}
		}
		const profileData: ProfileData = {
			posts: posts,
			followers: followerUsers,
			following: followingUsers,
		};
		return profileData;
	}
}
