import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { CommentController } from './controllers/commentController';
import { LikeController } from './controllers/likeController';
import {
	paymentVerification,
	payVerify,
} from './controllers/paymentController';
import { PostsController } from './controllers/postsController';
import { StoreController } from './controllers/storeController';
import { VendorController } from './controllers/vendorController';
import { corsOptions } from './cors';
import { Config } from './dbConfig';
import { isAuthREST } from './middlewares/isAuth';
import { postUpload, productUpload } from './multer';
import { CommentResolver } from './resolvers/comment/Comment';
import { FollowResolver } from './resolvers/follow/Follow';
import { LikeResolver } from './resolvers/like/Like';
import { MessageResolver } from './resolvers/message/Message';
import { PostResolver } from './resolvers/post/Post';
import { UserResolver } from './resolvers/user/User';

dotenv.config();

export const app = express();

(async () => {
	app.use(cors(corsOptions));
	app.use(cookieParser());
	app.use(express.json());
	app.get('/', (_req, res) => {
		res.send('Hello World');
	});

	await createConnection(Config);
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				UserResolver,
				FollowResolver,
				PostResolver,
				MessageResolver,
				LikeResolver,
				CommentResolver,
			],
		}),
		context: ({ req, res }) => ({ req, res }),
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({
		app: app,
		cors: corsOptions,
	});

	// const uploadProfile = multer({ dest: './public/profile' });
	const imgNameAttr = postUpload.single('post-image');

	//api endpoints
	const postsController = new PostsController();
	app.post('/post-donate', imgNameAttr, isAuthREST, postsController.donate);
	app.post('/post-adopt', imgNameAttr, isAuthREST, postsController.adopt);
	app.post('/post-buy', imgNameAttr, isAuthREST, postsController.buy);
	app.post('/post-sell', imgNameAttr, isAuthREST, postsController.sell);
	app.post('/post-lost', imgNameAttr, isAuthREST, postsController.lost);
	app.get('/post-image/:postid', postsController.getPostImage);

	const likeController = new LikeController();
	app.get('/like/status/:postId', isAuthREST, likeController.isLiked);
	app.get('/like/:postId', isAuthREST, likeController.likePost);
	app.get('/like/total/:postId', likeController.getTotalLikes);

	const commentController = new CommentController();
	app.get(
		'/comment/all/:postId',
		isAuthREST,
		commentController.getTotalComments
	);
	app.post('/comment/:postId', isAuthREST, commentController.postComment);

	app.post('/payment/verification', isAuthREST, paymentVerification);
	app.get('/payment/', isAuthREST, payVerify);

	const vendorController = new VendorController();
	app.get('/vendor/verify', isAuthREST, vendorController.isVendor);
	app.get('/vendor/apply', isAuthREST, vendorController.changeToVendor);

	const storeController = new StoreController();
	const storeImageHandler = productUpload.single('product-image');
	app.get('/product/:productId', isAuthREST, storeController.getProduct);
	app.get('/products/:userId', isAuthREST, storeController.getUserProducts);
	app.get('/product', isAuthREST, storeController.getProducts);
	app.get('/product/image/:productId', storeController.getProductImage);
	app.post(
		'/product',
		storeImageHandler,
		isAuthREST,
		storeController.addProduct
	);

	app.get('/stores', storeController.getStores);

	app.get('/carts', isAuthREST, storeController.getFromCart);
	app.get('/carts/:productId', isAuthREST, storeController.addToCart);
	app.delete('/carts/:cartId', isAuthREST, storeController.deleteFromCart);

	app.get('/order/', isAuthREST, storeController.placeOrder);
})();
