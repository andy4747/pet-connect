import axios from 'axios';
import KhaltiCheckout from 'khalti-checkout-web';
import React from 'react';

interface PayProps {
	productId: string;
	productName: string;
	productUrl: string;
	amount: number;
	cartId: number;
}

export const PlaceOrder = ({
	productId,
	productName,
	productUrl,
	cartId,
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

				axios
					.get(
						`http://localhost:5000/order/?price=${amount}&productId=${productId}&cartId=${cartId}`,
						{
							withCredentials: true,
						}
					)
					.then((response) => {
						console.log(response.data);
						alert('Order Successfull');
					})
					.catch((error) => {
						console.log(error);
						alert('Order Unsuccessful');
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
		console.log(amount);
		checkout.show({ amount: amount });
	};
	return (
		<button
			className='border bg-green-500 w-32 h-12 rounded-md text-pet-white cursor-pointer'
			onClick={onPay}>
			{'Place Order'}
		</button>
	);
};
