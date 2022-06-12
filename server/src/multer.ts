import multer, { diskStorage } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const postStorage = diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, './public/post');
	},
	filename: (_req, file, cb) => {
		cb(null, `${v4()}${path.extname(file.originalname)}`);
	},
});

const profileStorage = diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, './public/profile');
	},
	filename: (_req, file, cb) => {
		cb(null, `${v4()}${path.extname(file.originalname)}`);
	},
});

const productStorage = diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, './public/product');
	},
	filename: (_req, file, cb) => {
		cb(null, `${v4()}${path.extname(file.originalname)}`);
	},
});

export const postUpload = multer({ storage: postStorage });
export const profileUpload = multer({ storage: profileStorage });
export const productUpload = multer({ storage: productStorage });
