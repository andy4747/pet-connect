import dotenv from 'dotenv';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';
import { isAuthCookie } from '../../middlewares/isAuth';
import { Like } from '../../models/Likes';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';

dotenv.config();

@Resolver()
export class LikeResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async likePost(@Arg('postId') postId: number, @Ctx() ctx: UserContext) {
		const idFromJWT = ctx.payload!.userID;
		const user = await User.findOne({ where: { id: idFromJWT } });
		if (!user) {
			console.log('current user not found');
			return false;
		}
		const likeStatus = await Like.findOne({
			where: { userId: idFromJWT, postId: postId },
		});
		const likeRepository = getRepository(Like);
		if (!likeStatus) {
			try {
				await likeRepository.save({
					userId: idFromJWT,
					postId: postId,
				});
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
		return false;
	}

	@Query(() => Number)
	@UseMiddleware(isAuthCookie)
	async getLikes(@Arg('postId') postId: Number) {
		const totalLikes = await Like.count({ where: { postId: postId } });
		return totalLikes;
	}

	@Query(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async isLiked(@Arg('postId') postId: Number, @Ctx() ctx: UserContext) {
		try {
			const like = await Like.findOne({
				where: { userId: ctx.payload!.userID, postId: postId },
			});
			if (!like) {
				return false;
			}
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
