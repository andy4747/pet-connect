import axios from 'axios';
import { Request, Response } from 'express';

export const paymentVerification = async (req: Request, res: Response) => {
	console.log('api hit');
	const { token, amount } = req.body;
	const data = {
		token: String(token),
		amount: Number(amount),
	};
	console.log('these are token and amount', data);
	const resp = await axios.post(
		'https://khalti.com/api/v2/payment/verify/',
		data,
		{
			headers: {
				Authorization: 'Key test_secret_key_193d34f3a0a44935af42609f3667f54f',
			},
		}
	);
	const respData = await resp.data;
	return res.json(respData);
};

export const payVerify = async (req: Request, res: Response) => {
	const token = String(req.query['token']);
	const amount = Number(req.query['amount']);
	const data = { token: token, amount: amount };
	console.log('these are token and amount', data);
	axios
		.post(`https://khalti.com/api/v2/payment/verify/`, data, {
			headers: {
				Authorization: 'Key test_secret_key_193d34f3a0a44935af42609f3667f54f',
			},
		})
		.then((response) => {
			return res.json(response.data);
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).json({ error: 'payment failed' });
		});
};
