import { Request, Response } from 'express';
import path from 'path/posix';
import { Post } from '../models/Posts';
import { User } from '../models/Users';

export class PostsController {
	async donate(req: Request, res: Response) {
		const { title, body, species, color, age } = req.body;
		const userID = Number(req.headers['userID']);
		const filename = req.file?.filename;
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'user not found' });
			}
			await Post.insert({
				title: title,
				body: body,
				species: species,
				color: color,
				age: Number(age),
				user: user,
				picture: filename,
				type: 'donate',
			});
			return res
				.status(200)
				.json({ message: 'donation post successfully created' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'cannot save post' });
		}
	}

	async adopt(req: Request, res: Response) {
		const { title, body, species, color, age } = req.body;
		const userID = Number(req.headers['userID']);
		const filename = req.file?.filename;
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'user not found' });
			}
			await Post.insert({
				title: title,
				body: body,
				species: species,
				color: color,
				age: Number(age),
				user: user,
				picture: filename,
				type: 'adopt',
			});
			return res
				.status(200)
				.json({ message: 'adopt post successfully created' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'cannot save post' });
		}
	}

	async lost(req: Request, res: Response) {
		const { title, body, species, color, age } = req.body;
		const userID = Number(req.headers['userID']);
		const filename = req.file?.filename;
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'user not found' });
			}
			await Post.insert({
				title: title,
				body: body,
				species: species,
				color: color,
				age: Number(age),
				user: user,
				picture: filename,
				type: 'lost',
			});
			return res
				.status(200)
				.json({ message: 'lost post successfully created' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'cannot save post' });
		}
	}

	async buy(req: Request, res: Response) {
		const { title, body, species, color, age, priceRange } = req.body;
		const userID = Number(req.headers['userID']);
		const filename = req.file?.filename;
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'user not found' });
			}
			await Post.insert({
				title: title,
				body: body,
				species: species,
				color: color,
				age: Number(age),
				user: user,
				picture: filename,
				type: 'buy',
				priceRange: priceRange,
			});
			return res.status(200).json({ message: 'buy post successfully created' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'cannot save post' });
		}
	}

	async sell(req: Request, res: Response) {
		const { title, body, species, color, age, price } = req.body;
		const userID = Number(req.headers['userID']);
		const filename = req.file?.filename;
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'user not found' });
			}
			await Post.insert({
				title: title,
				body: body,
				species: species,
				color: color,
				age: Number(age),
				user: user,
				picture: filename,
				type: 'sell',
				price: price,
			});
			return res
				.status(200)
				.json({ message: 'sell post successfully created' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'cannot save post' });
		}
	}
	async getPostImage(req: Request, res: Response) {
		const { postid } = req.params;
		try {
			const post = await Post.findOne({ where: { id: Number(postid) } });
			if (!post) return res.status(404).json({ error: `Post Not Found` });
			if (post.picture !== null) {
				const filePath = path.resolve(
					__dirname + '../../../public/post/' + post.picture
				);
				return res.sendFile(filePath);
			}
			return res.status(404).json({ error: `Post Not Found` });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: `Internal Error Occured` });
		}
	}
}
