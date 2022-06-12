import React, { useEffect, useState } from 'react';
import '../../styles/Store.module.css';
import { ProductCard } from './ProductCard';

export const MyStoreLayout = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/product', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setProducts(respData);
		})();
	}, []);
	return (
		<section className='bg-white py-2'>
			<div className='mx-auto flex items-center flex-wrap pt-4 pb-12'>
				{products.map((item: any) => {
					return (
						<ProductCard
							productId={item.id}
							key={item.id}
							price={item.price}
							productName={item.name}
							showCart={false}
							image={`http://localhost:5000/product/image/${item.id}`}
						/>
					);
				})}
			</div>
		</section>
	);
};
