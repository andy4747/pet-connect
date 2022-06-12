import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Logo from '../../public/logo/logo-light.svg';

export const Footer = () => {
	return (
		<footer className='bg-pet-indigo py-8'>
			<div className='container flex flex-col md:flex-row items-center'>
				<div className='flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12'>
					<Image
						src={Logo}
						alt='logo'
						height='65px'
						width='65px'
						color='white'
					/>
					<ul className='flex text-white uppercase gap-12 text-sm'>
						<li className='cursor-pointer'>About Us</li>
						<li className='cursor-pointer'>Contact</li>
					</ul>
				</div>
				<div className='flex gap-10 mt-8 md:mt-0'>
					<FaFacebook color='white' size={28} />
					<FaInstagram color='white' size={28} />
					<FaTwitter color='white' size={28} />
				</div>
			</div>
			<div className='flex flex-1 items-center justify-center mt-8'>
				<p className='text-center text-white'>
					Copyright ©
					<Link href={'/'}>
						<a> Angel Dhakal,</a>
					</Link>{' '}
					{new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
};
