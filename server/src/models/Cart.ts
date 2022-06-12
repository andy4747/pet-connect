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
import { Product } from './Product';
import { User } from './Users';

@ObjectType()
@Entity('carts')
export class Cart extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'bool', default: false })
	ordered: boolean;

	@Field()
	@Column({ name: 'user_id', nullable: false })
	userId: number;

	@Field()
	@Column({ name: 'product_id', type: 'number' })
	productId: number;

	@ManyToOne(() => Product, (product: Product) => product.cart, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'product_id' })
	product: Product;

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
}
