import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface StoreProps {
	id: number;
}

export const StoreLayout = ({ id }: StoreProps) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const resp = await fetch(`http://localhost:5000/products/${id}`, {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setProducts(respData);
		})();
	}, [id]);
	return (
		<>
			<section className='bg-white py-2'>
				<div className='mx-auto flex items-center flex-wrap pt-4 pb-12'>
					{products.map((item: any) => {
						return (
							<ProductCard
								key={item.id}
								productId={item.id}
								price={item.price}
								productName={item.name}
								showCart={true}
								image={`http://localhost:5000/product/image/${item.id}`}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
};
