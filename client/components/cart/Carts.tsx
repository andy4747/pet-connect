import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { PlaceOrder } from '../pay/PlaceOrder';
import { DashboardLayout } from '../util/DashboardLayout';

export const Carts = () => {
	const [cartItems, setCartItems] = useState([]);
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/carts', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setCartItems(respData);
		})();
	}, [counter]);
	return (
		<DashboardLayout pageName='Cart'>
			{console.log(cartItems)}
			{cartItems.map((item: any) => {
				if (item.ordered === false) {
					return (
						<div
							key={item.id}
							className='w-[80%] border-1 rounded-md bg-gray-100 shadow mt-4 p-4 mx-auto'>
							<div className='flex'>
								<Image
									src={`http://localhost:5000/product/image/${item.productId}`}
									alt=''
									width={60}
									height={60}
									className='flex-1'
								/>
								<p className='text-black flex-1'>{item.productName}</p>
								<p className='text-black flex-1'>Price: {item.productPrice}</p>
								<PlaceOrder
									amount={item.productPrice * 100}
									productId={item.productId}
									productName={item.productName}
									productUrl={'http://localhost:3000'}
									cartId={item.id}
								/>
								<AiFillDelete
									size={32}
									className='mt-4 ml-4'
									color='red'
									onClick={async () => {
										setCounter(counter + 1);
										await fetch(`http://localhost:5000/carts/${item.id}`, {
											method: 'DELETE',
											credentials: 'include',
										});
										alert('Successfully Deleted');
									}}
								/>
							</div>
						</div>
					);
				}
			})}
		</DashboardLayout>
	);
};
