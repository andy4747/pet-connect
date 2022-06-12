import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './Users';

@ObjectType()
@Entity('follows')
export class Follow extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ name: 'user_id', nullable: false })
	userId: number;

	@Field()
	@Column({ name: 'follower_id', nullable: false })
	followerId: number;

	@ManyToOne(() => User, (user: User) => user.user, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => User, (user: User) => user.follower, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'follower_id' })
	follower: User;

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
