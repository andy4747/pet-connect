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
import { Comment } from '../../models/Comment';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';
import { CommentData } from './CommentData';

dotenv.config();

@Resolver()
export class CommentResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async createComment(
		@Arg('postId') postId: number,
		@Arg('comment') comment: string,
		@Ctx() ctx: UserContext
	) {
		const idFromJWT = ctx.payload!.userID;
		const user = await User.findOne({ where: { id: idFromJWT } });
		if (!user) {
			console.log('current user not found');
			return false;
		}
		const commentRepository = getRepository(Comment);
		try {
			await commentRepository.save({
				userId: idFromJWT,
				postId: postId,
				comment: comment,
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	@Query(() => [CommentData])
	@UseMiddleware(isAuthCookie)
	async getComments(@Arg('postId') postId: Number) {
		const allComments = await Comment.find({ where: { postId: postId } });
		let filteredComments: CommentData[] = [];
		for (const comment of allComments) {
			const user = await User.findOne({ where: { id: comment.userId } });
			const commentData: CommentData = {
				comment: comment.comment,
				createdAt: comment.createdAt,
				updatedAt: comment.updatedAt,
				id: comment.id,
				postId: comment.postId,
				userId: comment.userId,
				username: user!.username,
			};
			filteredComments.push(commentData);
		}
		return filteredComments;
	}
}
