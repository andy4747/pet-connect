import dotenv from 'dotenv';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { isAuthCookie } from '../../middlewares/isAuth';
import { Follow } from '../../models/Follows';
import { Post } from '../../models/Posts';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';
import { PostData } from './PostData';

dotenv.config();

@Resolver()
export class PostResolver {
	@Query(() => [Post!])
	@UseMiddleware(isAuthCookie)
	getPosts() {
		return Post.find();
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthCookie)
	async createPost(
		@Arg('title') title: string,
		@Arg('body') body: string,
		@Ctx() { payload }: UserContext
	) {
		if (!title || !body) {
			return false;
		}
		try {
			const user = await User.findOne({ where: { id: payload!.userID } });
			if (!user) {
				return false;
			}
			await Post.insert({
				title: title,
				body: body,
				user: user,
				picture: 'a',
				species: 'dog',
			});
		} catch (error) {
			return false;
		}
		return true;
	}

	@Query(() => [Post!])
	@UseMiddleware(isAuthCookie)
	async userPost(@Ctx() { payload }: UserContext) {
		const resp = await Post.find({
			where: { userId: payload!.userID },
		});
		return resp;
	}

	@Query(() => [PostData!])
	@UseMiddleware(isAuthCookie)
	async userFeed(@Ctx() { payload }: UserContext) {
		const followers = await Follow.find({
			where: [{ followerId: payload!.userID }],
		});

		const datas: PostData[] = [];

		for (const follow of followers) {
			let userPosts = await Post.find({ where: { userId: follow.userId } });
			userPosts = userPosts.slice(-2);

			// #2 Method
			if (userPosts) {
				try {
					const firstPost = userPosts[0];
					const user = await User.findOneOrFail({
						where: { id: firstPost.userId },
					});
					for (const eachPost of userPosts) {
						const userData: PostData = {
							id: eachPost.id,
							username: user.username,
							image: `http://localhost:5000/post-image/${eachPost.id}`,
							postType: eachPost.type,
							body: eachPost.body,
							createdAt: eachPost.createdAt,
							title: eachPost.title,
							updatedAt: eachPost.updatedAt,
							userId: eachPost.userId,
							price: String(eachPost.price),
						};
						console.log(userData);
						datas.push(userData);
					}
				} catch (error) {
					if (!(error instanceof TypeError)) {
						console.log(error);
					}
				}
			}
		}
		return datas;
	}
}
