import dotenv from 'dotenv';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { isAuthCookie } from '../../middlewares/isAuth';
import { Follow } from '../../models/Follows';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';

dotenv.config();

@Resolver()
export class FollowResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async followUser(
		@Arg('followingId') followingId: number,
		@Ctx() ctx: UserContext
	) {
		const idFromJWT = ctx.payload!.userID;
		const user = await User.findOne({ where: { id: idFromJWT } });
		if (!user) {
			console.log('current user not found');
			return false;
		}
		const follower = await User.findOne({ where: { id: followingId } });
		if (!follower) {
			console.log('following user not found');
			return false;
		}
		if (follower.id === user.id) {
			console.log('same user');
			return false;
		}
		try {
			const oldFollowingUser = await Follow.findOne({
				where: { user: follower, follower: user },
			});
			if (oldFollowingUser) {
				console.log('object');
				return false;
			}
		} catch (error) {
			console.log('failed unique following query');
			return false;
		}
		try {
			await Follow.insert({ user: follower, follower: user });
		} catch (error) {
			console.log('failed insertion');
			return false;
		}
		return true;
	}
}
