import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/Users';

export class VendorController {
	async isVendor(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ isVendor: false });
			}
			if (user.role === 'org') return res.status(200).json({ isVendor: true });
			return res.status(200).json({ isVendor: false });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async changeToVendor(req: Request, res: Response) {
		try {
			const userID = Number(req.headers['userID']);
			const user = await User.findOne({ where: { id: userID } });
			if (!user) {
				return res.status(200).json({ isVendor: false });
			}
			const userRepo = getRepository(User);
			const newUser = await userRepo.save({ id: user.id, role: 'org' });
			if (newUser.role === 'org')
				return res
					.status(200)
					.json({ message: 'successfully updated to vendor' });
			return res.status(200).json({ isVendor: false });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
}
