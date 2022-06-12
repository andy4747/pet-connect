import axios from 'axios';
import KhaltiCheckout from 'khalti-checkout-web';
import React from 'react';

interface PayProps {
	productId: string;
	productName: string;
	productUrl: string;
	amount: number;
}

export const Pay = ({
	productId,
	productName,
	productUrl,
	amount,
}: PayProps) => {
	const data = {
		publicKey: 'test_public_key_840d1a698f9e48bb8c0be7329f687ff4',
		productIdentity: productId,
		productName: productName,
		productUrl: productUrl,
		eventHandler: {
			onSuccess(payload: any) {
				console.log(payload);
				const reqdata = {
					token: payload.token,
					amount: payload.amount,
				};
				axios
					.get(
						`http://localhost:5000/payment/?token=${payload.token}&amount=${payload.amount}`,
						{
							withCredentials: true,
						}
					)
					.then((response) => {
						console.log(response.data);
						alert('Payment Successfull');
					})
					.catch((error) => {
						console.log(error);
						alert('Payment Unsuccessful');
					});
			},
			onError(error: any) {
				console.log(error);
			},
			onClose() {
				console.log('widget is closing');
			},
		},
		paymentPreference: [
			'KHALTI',
			'EBANKING',
			'MOBILE_BANKING',
			'CONNECT_IPS',
			'SCT',
		],
	};
	const onPay = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let checkout = new KhaltiCheckout(data);
		checkout.show({ amount: amount });
	};
	return (
		<button
			className='border bg-violet-800 w-32 h-12 rounded-md text-pet-white cursor-pointer'
			onClick={onPay}>
			{'Pay With Khalti'}
		</button>
	);
};
