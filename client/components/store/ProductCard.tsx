import Image from 'next/image';
import React from 'react';
import { BsCartPlus } from 'react-icons/bs';

interface ProductCardProps {
	image: string;
	productName: string;
	productId: number;
	price: number;
	showCart: boolean;
}

export const ProductCard = ({
	productName,
	price,
	image,
	productId,
	showCart,
}: ProductCardProps) => {
	const onAddToCart = async () => {
		await fetch(`http://localhost:5000/carts/${productId}`, {
			method: 'GET',
			credentials: 'include',
		});
	};
	return (
		<div className='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
			{console.log(productId)}
			<div>
				<Image
					className='hover:grow hover:shadow-lg'
					src={image}
					alt='a'
					width={350}
					height={310}
				/>
				<div className='pt-3 flex items-center justify-between'>
					<p className=''>{productName}</p>
					{showCart === true && (
						<div onClick={onAddToCart} className='cursor-pointer'>
							<BsCartPlus size={24} />
						</div>
					)}
				</div>
				<p className='pt-1 text-gray-900'>RS. {price}</p>
			</div>
		</div>
	);
};
