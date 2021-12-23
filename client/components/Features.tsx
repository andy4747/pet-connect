import Image from 'next/image';
import React from 'react';
import FeatureTwo from '../public/adopt.jpg';
import FeatureOne from '../public/pet-shop-board.jpg';
import FeatureThree from '../public/pet-shop.jpg';

export const Features = () => {
	return (
		<section className='bg-pet-white py-20 mt-20 lg:mt-60'>
			{/* Heading */}
			<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
				<h1 className='text-3xl text-center text-pet-blue'>Features</h1>
				<p className='text-center text-pet-grey mt-4'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
					dignissimos quo, veritatis voluptatibus dolor aspernatur laboriosam ut
					perspiciatis ex excepturi!
				</p>
			</div>
			{/* Feature #1 */}
			<div className='relative mt-20 lg:mt-24'>
				<div className='container flex flex-col lg:flex-row items-center justify-center gap-x-24'>
					{/* Feature Image */}
					<div className='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
						<Image src={FeatureOne} alt='feature 1' />
					</div>
					{/* Feature Content */}
					<div className='flex flex-1 flex-col items-center lg:items-start'>
						<h1 className='text-3xl text-pet-blue'> Buy/Sell Pets</h1>
						<p className='text-pet-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, a
							enim. Quos voluptatibus aliquam beatae ducimus commodi autem iure!
							Minus!
						</p>
					</div>
				</div>
				{/* Rounded Rectangle */}
				<div className='hidden lg:block overflow-hidden bg-pet-indigo rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36'></div>
			</div>

			{/* Feature #2 */}
			<div className='relative mt-20 lg:mt-52'>
				<div className='container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24'>
					{/* Feature Image */}
					<div className='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
						<Image src={FeatureTwo} alt='feature 2' />
					</div>
					{/* Feature Content */}
					<div className='flex flex-1 flex-col items-center lg:items-start'>
						<h1 className='text-3xl text-pet-blue'> Adopt/Donate Pets</h1>
						<p className='text-pet-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, a
							enim. Quos voluptatibus aliquam beatae ducimus commodi autem iure!
							Minus!
						</p>
					</div>
				</div>
				{/* Rounded Rectangle */}
				<div className='hidden lg:block overflow-hidden bg-pet-indigo rounded-l-full absolute h-80 w-2/4 -bottom-24 -right-36'></div>
			</div>

			{/* Feature #3 */}
			<div className='relative mt-20 lg:mt-52'>
				<div className='container flex flex-col lg:flex-row items-center justify-center gap-x-24'>
					{/* Feature Image */}
					<div className='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
						<Image src={FeatureThree} alt='feature 3' />
					</div>
					{/* Feature Content */}
					<div className='flex flex-1 flex-col items-center lg:items-start'>
						<h1 className='text-3xl text-pet-blue'>E-Commerce</h1>
						<p className='text-pet-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, a
							enim. Quos voluptatibus aliquam beatae ducimus commodi autem iure!
							Minus!
						</p>
					</div>
				</div>
				{/* Rounded Rectangle */}
				<div className='hidden lg:block overflow-hidden bg-pet-indigo rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36'></div>
			</div>
		</section>
	);
};
