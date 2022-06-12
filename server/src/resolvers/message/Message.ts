import { AuthenticationError, UserInputError } from 'apollo-server-express';
import dotenv from 'dotenv';
import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getManager, getRepository } from 'typeorm';
import { isAuthCookie } from '../../middlewares/isAuth';
import { Follow } from '../../models/Follows';
import { Message } from '../../models/Messages';
import { User } from '../../models/Users';
import { UserContext } from '../../userContext';

dotenv.config();

@ObjectType()
export class ChatUsers {
	@Field()
	id: number;

	@Field()
	username: string;

	@Field()
	message: string;
}

@Resolver()
export class MessageResolver {
	@Mutation(() => Message)
	@UseMiddleware(isAuthCookie)
	async sendMessage(
		@Arg('username') username: string,
		@Arg('content') content: string,
		@Ctx() ctx: UserContext
	) {
		const sender = await User.findOne({ where: { id: ctx.payload!.userID } });
		if (!sender) throw new AuthenticationError('User not authenticated');
		const receiver = await User.findOne({ where: { username: username } });
		if (!receiver) throw new UserInputError(`User not found`);
		if (content.trim() === '') throw new UserInputError('Message is empty');
		if (sender.id === receiver.id)
			throw new UserInputError('Cannot message to yourself');
		const messageRepo = getRepository(Message);
		const message = await messageRepo.save({
			content: content,
			fromUser: sender,
			toUser: receiver,
			senderUsername: sender.username,
			receiverUsername: receiver.username,
		});
		return message;
	}

	@Query(() => [Message])
	@UseMiddleware(isAuthCookie)
	async getMessages(
		@Ctx() ctx: UserContext,
		@Arg('username') username: string
	) {
		const sender = await User.findOne({ where: { id: ctx.payload!.userID } });
		if (!sender) throw new AuthenticationError('User not authenticated');
		const receiver = await User.findOne({ where: { username: username } });
		if (!receiver) throw new UserInputError(`User not found`);

		const newmessages = await getManager()
			.createQueryBuilder(Message, 'messages')
			.where(
				'(messages.senderUsername = :senderUsername AND messages.receiverUsername = :receiverUsername) OR (messages.senderUsername = :receiverUsername AND messages.receiverUsername = :senderUsername)',
				{ senderUsername: sender.username, receiverUsername: receiver.username }
			)
			.orderBy('messages.created_at', 'ASC')
			.getMany();

		return newmessages;
	}

	@Query(() => [Message])
	@UseMiddleware(isAuthCookie)
	async getChatList(@Ctx() ctx: UserContext) {
		const sender = await User.findOne({ where: { id: ctx.payload!.userID } });
		if (!sender) throw new AuthenticationError('User not authenticated');
		let followers = await Follow.find({
			where: [{ followerId: sender.id }, { userId: sender.id }],
		});
		let chatableUserList: number[] = [];
		followers.forEach((follower) => {
			if (follower.followerId !== sender.id) {
				chatableUserList.push(follower.followerId);
			}
			if (follower.userId !== sender.id) {
				chatableUserList.push(follower.userId);
			}
		});

		followers.forEach((follower) => {
			if (follower.followerId !== sender.id) {
				chatableUserList.push(follower.followerId);
			}
			if (follower.userId !== sender.id) {
				chatableUserList.push(follower.userId);
			}
		});
		chatableUserList = [...new Set(chatableUserList)];
		const messages = await getManager()
			.createQueryBuilder(Message, 'messages')
			.where('messages.to IN (:...users)', { users: chatableUserList })
			.orderBy('messages.created_at', 'DESC')
			.getMany();

		const seen = new Set();
		const filteredMessages = messages.filter((message) => {
			const dup = seen.has(message.to);
			seen.add(message.to);
			return !dup;
		});
		return filteredMessages;
	}
}
