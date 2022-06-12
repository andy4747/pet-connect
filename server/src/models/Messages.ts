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
import { User } from './Users';

@ObjectType()
@Entity('messages')
export class Message extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	content: string;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	senderUsername: string;

	@Field()
	@Column({ type: 'text', nullable: false, unique: false })
	receiverUsername: string;

	@Field()
	@Column({ name: 'from', nullable: false })
	from: number;

	@Field()
	@Column({ name: 'to', nullable: false })
	to: number;

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user: User) => user.user, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'from' })
	fromUser: User;

	@ManyToOne(() => User, (user: User) => user.user, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'to' })
	toUser: User;
}
