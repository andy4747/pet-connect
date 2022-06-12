import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../types';
import { Follow } from './Follows';
import { Post } from './Posts';
import { Product } from './Product';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'varchar', length: 320, nullable: false, unique: true })
	email: string;

	@Field()
	@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 255, nullable: false, unique: false })
	password: string;

	@Field()
	@Column({
		type: 'enum',
		default: 'general',
		enum: ['admin', 'general', 'org'],
	})
	role: UserRole;

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Field()
	@Column({ name: 'token_version', type: 'int', default: 0 })
	tokenVersion: number;

	@OneToMany(() => Follow, (follower: Follow) => follower.user)
	user: Follow[];

	@OneToMany(() => Follow, (follower: Follow) => follower.follower)
	follower: Follow[];

	@OneToMany(() => Post, (post: Post) => post.user)
	post: Post[];

	@OneToMany(() => Product, (product: Product) => product.user)
	product: Product[];
}
