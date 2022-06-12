import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Like } from './Likes';
import { User } from './Users';

type PostType = 'buy' | 'sell' | 'adopt' | 'donate' | 'lost';

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'varchar', length: 320, nullable: false, unique: false })
	title: string;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	body: string;

	@Field()
	@Column({ type: 'text', nullable: true, unique: false })
	picture: string;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	species: string;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	color: string;

	@Field()
	@Column({ type: 'int', nullable: false, unique: false })
	age: number;

	@Field()
	@Column({ type: 'float', nullable: true, unique: false })
	price: number;

	@Field()
	@Column({ type: 'text', nullable: true, unique: false })
	priceRange: string;

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Field()
	@Column({
		type: 'enum',
		default: 'buy',
		enum: ['buy', 'sell', 'adopt', 'donate', 'lost'],
	})
	type: PostType;

	@Field()
	@Column({ name: 'user_id', nullable: false })
	userId: number;

	@ManyToOne(() => User, (user: User) => user.user, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@OneToMany(() => Like, (like: Like) => like.post)
	like: Like[];

	@OneToMany(() => Comment, (comment: Comment) => comment.post)
	comment: Comment[];
}
