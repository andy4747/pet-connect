import Image from 'next/image';
import React from 'react';
import HeroImg from '../public/hero1.jpg';

export const Hero = () => {
	return (
		<section className='relative'>
			<div className='container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28'>
				{/* content */}
				<div className='flex flex-1 flex-col items-center lg:items-start'>
					<h2 className='text-pet-blue text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mb-6'>
						All In One Pets Solution
					</h2>
					<p className='text-pet-grey text-lg text-center lg:text-left mb-6'>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						Perferendis natus suscipit facilis accusamus voluptatem praesentium
						commodi repudiandae amet ex corporis?
					</p>
					<div className='flex justify-center flex-wrap gap-6'>
						<button
							className='pet-btn pet-btn-indigo hover:bg-pet-blue hover:text-pet-white'
							type='button'>
							FAQ?
						</button>
					</div>
				</div>
				{/* Image */}
				<div className='flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10'>
					<Image
						src={HeroImg}
						alt='Hero Image'
						className='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
					/>
				</div>
			</div>
			{/* Rounded Rectangle */}
			{/* <div className='hidden md:block overflow-hidden bg-pet-indigo rounded-l-full absolute h-80 w-2/4 top-32 right-0'>
			</div> */}
		</section>
	);
};
