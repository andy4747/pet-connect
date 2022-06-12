import { Request, Response } from 'express';
import path from 'path/posix';
import { getRepository } from 'typeorm';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/Users';

export class StoreController {
	async getProducts(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'User Not Found' });
			}
			const products = await Product.find({ where: { userId: user.id } });
			return res.status(200).json(products);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getUserProducts(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const user = await User.findOne({ where: { id: Number(userId) } });
			if (!user) {
				return res.status(200).json({ error: 'User Not Found' });
			}
			const products = await Product.find({ where: { userId: user.id } });
			return res.status(200).json(products);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getProduct(req: Request, res: Response) {
		try {
			const { productId } = req.params;
			const userID = Number(req.headers['userID']);
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'no user found' });
			}
			const product = await Product.findOne({
				where: { id: Number(productId) },
			});
			if (!product) return res.status(404).json({ error: 'Product Not Found' });
			return res.status(200).json(product);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getProductImage(req: Request, res: Response) {
		const { productId } = req.params;
		try {
			const product = await Product.findOne({
				where: { id: Number(productId) },
			});
			if (!product) return res.status(404).json({ error: `Product Not Found` });
			if (product.image !== null) {
				const filePath = path.resolve(
					__dirname + '../../../public/product/' + product.image
				);
				return res.sendFile(filePath);
			}
			return res.status(404).json({ error: `Product Not Found` });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: `Internal Error Occured` });
		}
	}

	async addProduct(req: Request, res: Response) {
		const { productName, productPrice } = req.body;
		const filename = req.file?.filename;
		const userID = Number(req.headers['userID']);
		try {
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ error: 'User Not Found' });
			}
			const product = await Product.insert({
				name: productName,
				price: Number(productPrice),
				userId: userID,
				image: filename,
			});
			return res.status(200).json(product);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getStores(_req: Request, res: Response) {
		try {
			const users = await User.find({ where: { role: 'org' } });
			return res.status(200).json(users);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async addToCart(req: Request, res: Response) {
		const userID = Number(req.headers['userID']);
		const { productId } = req.params;
		console.log(productId);
		try {
			const newCart = await Cart.insert({
				ordered: false,
				userId: userID,
				productId: Number(productId),
			});
			return res.status(200).json(newCart);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async getFromCart(req: Request, res: Response) {
		const userID = Number(req.headers['userID']);
		try {
			const carts = await Cart.find({ where: { userId: userID } });
			const result = [];
			for (const cart of carts) {
				const product = await Product.findOne({
					where: { id: cart.productId },
				});
				if (!product) return res.json({ error: 'product not found' });
				const data = {
					productName: product.name,
					productPrice: product.price,
					...cart,
				};
				result.push(data);
			}
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async deleteFromCart(req: Request, res: Response) {
		const userID = Number(req.headers['userID']);
		const { cartId } = req.params;
		try {
			const cart = await Cart.findOne({ where: { id: Number(cartId) } });
			if (!cart) return res.status(404).json({ error: 'cart not found' });
			await Cart.delete({ id: cart.id, userId: userID });
			return res.status(200).json({ message: 'successfully deleted' });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async placeOrder(req: Request, res: Response) {
		const userID = Number(req.headers['userID']);
		const productId = Number(req.query['productId']);
		const cartId = Number(req.query['cartId']);
		const price = Number(req.query['price']);
		try {
			await Order.insert({
				userId: userID,
				productId: Number(productId),
				price: Number(price),
			});
			const cart = await Cart.findOne({ where: { id: cartId } });
			if (!cart) {
				return res.status(404).json({ error: 'item not found in cart' });
			}
			const cartRepo = getRepository(Cart);
			const updatedCart = await cartRepo.save({
				id: cart.id,
				ordered: true,
			});
			return res.status(200).json(updatedCart);
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
}
