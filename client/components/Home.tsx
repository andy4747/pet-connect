import React from 'react';
import { FAQ } from './FAQ/FAQ';
import { Features } from './Features';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Navbar } from './Navbar';

export const Home = () => {
	return (
		<>
			<div className='overflow-hidden'>
				<Navbar />
				<Hero />
				<Features />
				<FAQ />
				<Footer />
			</div>
		</>
	);
};
