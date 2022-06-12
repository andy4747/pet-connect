import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Like } from '../models/Likes';
import { Post } from '../models/Posts';
import { User } from '../models/Users';

export class LikeController {
	async isLiked(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const { postId } = req.params;
			const like = await Like.findOne({
				where: { userId: userID, postId: postId },
			});
			if (!like) return res.status(200).json({ liked: false });
			return res.status(200).json({ liked: true });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getTotalLikes(req: Request, res: Response) {
		try {
			const { postId } = req.params;
			const totalLikes = await Like.count({
				where: { postId: Number(postId) },
			});
			return res.status(200).json({ likes: totalLikes });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async likePost(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const { postId } = req.params;
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				console.log('current user not found');
				return res.status(404).json({ error: 'user not found' });
			}
			const likeStatus = await Like.findOne({
				where: { userId: userID, postId: postId },
			});
			const post = await Post.findOne({ where: { id: Number(postId) } });
			if (!post) return res.status(404).json({ error: 'post not found' });
			const likeRepository = getRepository(Like);
			if (!likeStatus) {
				await likeRepository.save({ postId: post.id, userId: user.id });
				return res.status(200).json({ liked: true });
			} else {
				await Like.delete({ postId: post.id, userId: user.id });
				return res.status(200).json({ liked: false });
			}
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
}
