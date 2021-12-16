import Image from 'next/image';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from '../public/dog2.svg';

export const Navbar = () => {
	return (
		<header className='font-Poppins'>
			<nav className='container flex items-center py-4 mt-4 sm:mt-12'>
				<div className='py-1'>
					<Image src={Logo} alt='logo' height='45px' width='45px' />
				</div>
				<h2 className='cursor-pointer ml-2 font-semibold text-2xl mb-2 text-pet-indigo'>
					PetConnect
				</h2>
				<ul className='hidden sm:flex flex-1 justify-end items-center gap-12 text-black-100 uppercase text-xs mb-2'>
					<li className='cursor-pointer'>Home</li>
					<li className='cursor-pointer'>About Us</li>
					<li className='cursor-pointer'>Contact</li>
					<button
						className='cursor-pointer bg-pet-red text-pet-white rounded-md px-7 py-3 uppercase'
						type='button'>
						Login
					</button>
					<button
						className='cursor-pointer bg-pet-indigo text-pet-white hover:bg-pet-blue transition duration-300 shadow-md rounded-md px-7 py-3 uppercase'
						type='button'>
						Register
					</button>
				</ul>
				<div className='flex sm:hidden flex-1 justify-end cursor-pointer'>
					<GiHamburgerMenu size={42} />
				</div>
			</nav>
		</header>
	);
};
