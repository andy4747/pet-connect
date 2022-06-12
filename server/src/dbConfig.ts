import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

export const Config: ConnectionOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [__dirname + '/models/*.{ts,js}'],
};
