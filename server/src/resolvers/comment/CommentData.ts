import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CommentData {
	@Field()
	id: number;

	@Field()
	userId: number;

	@Field()
	postId: number;

	@Field()
	comment: string;

	@Field()
	username: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
