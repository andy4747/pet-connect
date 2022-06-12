import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Posts';
import { User } from './Users';

@ObjectType()
@Entity('likes')
export class Like extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ name: 'user_id', nullable: false })
	userId: number;

	@Field()
	@Column({ name: 'post_id', nullable: false })
	postId: number;

	@ManyToOne(() => User, (user: User) => user.user, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Post, (post: Post) => post.like, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'post_id' })
	post: Post;

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}
