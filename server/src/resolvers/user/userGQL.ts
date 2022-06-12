import { Field, ObjectType } from 'type-graphql';
import { Post } from '../../models/Posts';
import { User } from '../../models/Users';

@ObjectType()
export class LoginData {
	@Field()
	accessToken: string;
}

@ObjectType()
export class VendorConversion {
	@Field()
	status: boolean;

	@Field()
	message: string;
}

@ObjectType()
export class ProfileData {
	@Field(() => [Post])
	posts: Post[];

	@Field(() => [User])
	followers: User[];

	@Field(() => [User])
	following: User[];
}
