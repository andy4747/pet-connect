import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../models/Comment';
import { Post } from '../models/Posts';
import { User } from '../models/Users';

export class CommentController {
	async getTotalComments(req: Request, res: Response) {
		try {
			const { postId } = req.params;
			const post = await Post.findOne({ where: { id: Number(postId) } });
			if (!post) return res.status(404).json({ error: 'post not found' });
			const totalComments = await Comment.find({ where: { postId: post.id } });
			const commentDatas = [];
			for (const comment of totalComments) {
				const user = await User.findOneOrFail({
					where: { id: comment.userId },
				});
				const data = { ...comment, username: user.username };
				commentDatas.push(data);
			}
			return res.status(200).json(commentDatas);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async postComment(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const { postId } = req.params;
			const { comment } = req.body;
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(404).json({ error: 'user not found' });
			}
			const post = await Post.findOne({ where: { id: Number(postId) } });
			if (!post) return res.status(404).json({ error: 'post not found' });
			const commentRepository = getRepository(Comment);
			await commentRepository.save({
				userId: user.id,
				postId: post.id,
				comment: String(comment),
			});
			return res.status(200).json({ message: 'successfully commented' });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
}
