import Link from 'next/link';
import React from 'react';

export const MobileNavbar = () => {
	return (
		<ul className='container flex flex-col text-center py-4 md:hidden lg:hidden sm:mt-2'>
			<li className='cursor-pointer py-4 px-4 mt-3 bg-pet-light-grey'>Home</li>
			<li className='cursor-pointer py-4 px-4 mt-3 bg-pet-light-grey'>
				About Us
			</li>
			<li className='cursor-pointer py-4 px-4 mt-3 bg-pet-light-grey'>
				Contact
			</li>
			<Link href='/login' passHref>
				<button
					className='cursor-pointer mt-3 bg-pet-red text-pet-white rounded-md px-7 py-3 uppercase'
					type='button'>
					Login
				</button>
			</Link>
			<Link href='/register' passHref>
				<button
					className='cursor-pointer mt-3 bg-pet-indigo text-pet-white hover:bg-pet-blue transition duration-300 shadow-md rounded-md px-7 py-3 uppercase'
					type='button'>
					Register
				</button>
			</Link>
		</ul>
	);
};
