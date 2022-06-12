import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiAddToQueue, BiShoppingBag } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs';
import { LOGOUT_MUTATION } from '../../graphql/mutations/logout';
import Logo from '../../public/logo/logo-light.svg';

interface Props {
	children: React.ReactNode;
	pageName: string;
}

export const DashboardLayout = ({ children, pageName }: Props) => {
	const router = useRouter();
	const [vendorCounter, setVendorCounnter] = useState(0);
	const [isVendor, setIsVendor] = useState(true);
	const [logout] = useMutation(LOGOUT_MUTATION);
	const logoutHandler = () => {
		logout();
		router.push('/login');
	};
	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/vendor/verify', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setIsVendor(respData.isVendor);
		})();
	}, [vendorCounter]);
	const applyForVendor = async (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		const resp = await fetch('http://localhost:5000/vendor/apply', {
			method: 'GET',
			credentials: 'include',
		});
		setVendorCounnter(vendorCounter + 1);
	};
	return (
		<div>
			<div className='flex flex-row min-h-screen bg-gray-100 text-gray-800'>
				<aside className='sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800'>
					<div className='sticky top-0'>
						<div className='sidebar-header flex items-center justify-center py-4'>
							<div
								className='inline-flex cursor-pointer'
								onClick={() => {
									router.push('/dashboard');
								}}>
								<p className='inline-flex flex-row items-center'>
									<Image src={Logo} alt='logo' width={40} height={40} />
									<span className='leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase'>
										PetConnect
									</span>
								</p>
							</div>
						</div>
						<div className='sidebar-content px-4 py-6'>
							<ul className='flex flex-col w-full'>
								<li
									className='my-px cursor-pointer'
									onClick={() => {
										router.push('/dashboard');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-gray-700'>
										<span className='flex items-center justify-center text-lg text-white hover:text-black'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
											</svg>
										</span>
										<span className='ml-3 text-white'>Dashboard</span>
									</p>
								</li>
								<li className='my-px'>
									<span className='flex font-medium text-sm text-white px-4 my-4 uppercase'>
										Projects
									</span>
								</li>
								<li
									className='my-px cursor-pointer'
									onClick={() => {
										router.push('/post');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
											</svg>
										</span>
										<span className='ml-3 text-white'>Post</span>
									</p>
								</li>
								<li
									className='my-px cursor-pointer'
									onClick={() => {
										router.push('/chats');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
											</svg>
										</span>
										<span className='ml-3 text-white'>Chat</span>
									</p>
								</li>
								<li
									className='my-px  cursor-pointer'
									onClick={() => {
										router.push('/store');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<BiShoppingBag size={26} />
										</span>
										<span className='ml-3 text-white'>Stores</span>
									</p>
								</li>
								<li className='my-px'>
									<span className='flex font-medium text-sm text-gray-300 px-4 my-4 uppercase'>
										Account
									</span>
								</li>
								<li
									className='my-px cursor-pointer'
									onClick={() => {
										router.push('/profile');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
											</svg>
										</span>
										<span className='ml-3 text-white'>Profile</span>
									</p>
								</li>
								{isVendor === true && (
									<li
										className='my-px cursor-pointer'
										onClick={() => {
											router.push('/my-store');
										}}>
										<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
											<span className='flex items-center justify-center text-lg text-gray-400'>
												<BiShoppingBag size={26} />
											</span>
											<span className='ml-3 text-white'>My Store</span>
										</p>
									</li>
								)}
								{/* <li className='my-px cursor-pointer'>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-gray-300'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
											</svg>
										</span>
										<span className='ml-3'>Notifications</span>
										<span className='flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto'>
											10
										</span>
									</p>
								</li> */}
								<li
									className='my-px cursor-pointer'
									onClick={() => {
										router.push('/cart');
									}}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
										<span className='flex items-center justify-center text-lg text-gray-400'>
											<BsCartCheck size={24} />
										</span>
										<span className='ml-3 text-white'>Cart</span>
									</p>
								</li>

								{isVendor === false && (
									<li className='my-px cursor-pointer' onClick={applyForVendor}>
										<p className='flex flex-row items-center h-10 px-3 rounded-lg text-white'>
											<span className='flex items-center justify-center text-lg text-gray-400'>
												<BiAddToQueue size={26} />
											</span>
											<span className='ml-3 text-white'>Apply For Vendor</span>
										</p>
									</li>
								)}

								<li className='my-px cursor-pointer' onClick={logoutHandler}>
									<p className='flex flex-row items-center h-10 px-3 rounded-lg  text-white'>
										<span className='flex items-center justify-center text-lg text-red-400'>
											<svg
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6'>
												<path d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z' />
											</svg>
										</span>
										<span className='ml-3'>Logout</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</aside>

				<main className='main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in dash-bg sticky bottom-0'>
					{router.pathname.startsWith('/chats/') ||
					router.pathname.startsWith('/my-store') ||
					router.pathname.startsWith('/store/') ||
					router.pathname.startsWith('/profile') ? null : (
						<header className='header bg-white shadow py-4 px-4'>
							<div className='header-content flex items-center flex-row'>
								<h1 className='font-bold text-2xl text-gray-700 ml-12'>
									{pageName.toUpperCase()}
								</h1>
							</div>
						</header>
					)}

					{children}
				</main>
			</div>
		</div>
	);
};
