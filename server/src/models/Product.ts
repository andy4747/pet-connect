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
import { Cart } from './Cart';
import { Order } from './Order';
import { User } from './Users';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'text', nullable: false })
	name: string;

	@Field()
	@Column({ type: 'float', nullable: false })
	price: number;

	@Field()
	@Column({ type: 'text', nullable: false })
	image: string;

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

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => Cart, (cart: Cart) => cart.product)
	cart: Cart[];

	@OneToMany(() => Order, (order: Order) => order.product)
	order: Order[];
}
