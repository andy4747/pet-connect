import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PostData {
	@Field()
	id: number;

	@Field()
	title: string;

	@Field()
	body: string;

	@Field()
	image: string;

	@Field()
	postType: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	@Field()
	userId: number;

	@Field()
	username: string;

	@Field()
	price: string;
}
