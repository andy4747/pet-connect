import Image from 'next/image';
import Router from 'next/router';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from '../../../public/logo/logo-dark.svg';
import { MobileNavbar } from './MobileNavbar';

export const Navbar = () => {
	const [hamState, setHamState] = useState(false);
	return (
		<header className='font-Poppins'>
			<nav className='container flex items-center py-4 mt-4 sm:mt-12'>
				<div className='py-1'>
					<Image src={Logo} alt='logo' height='45px' width='45px' />
				</div>
				<h2 className='cursor-pointer ml-2 font-semibold text-2xl mb-2 text-pet-indigo'>
					PetConnect
				</h2>
				<ul className='hidden sm:flex flex-1 justify-end  md:gap-6 md:text-xs lg:text-sm lg:border-0 items-center gap-12 font-bold text-black-100 uppercase text-xs mb-2'>
					<li className='cursor-pointer'>Home</li>
					<li className='cursor-pointer'>About Us</li>
					<li className='cursor-pointer'>Contact</li>

					<button
						className='cursor-pointer bg-pet-red text-pet-white rounded-md px-7 py-3 uppercase'
						type='button'
						onClick={() => {
							Router.push('/login');
						}}>
						Login
					</button>
					<button
						className='cursor-pointer bg-pet-indigo text-pet-white hover:bg-pet-blue transition duration-300 shadow-md rounded-md px-7 py-3 uppercase'
						type='button'
						onClick={() => {
							Router.push('/register');
						}}>
						Register
					</button>
				</ul>
				<div className='flex sm:hidden flex-1 justify-end cursor-pointer'>
					<GiHamburgerMenu
						size={42}
						onClick={() => {
							setHamState(!hamState);
						}}
					/>
				</div>
			</nav>
			{hamState && <MobileNavbar />}
		</header>
	);
};
