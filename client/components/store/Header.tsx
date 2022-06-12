import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdAdd, MdOutlineShoppingCart } from 'react-icons/md';
import '../../styles/Store.module.css';
import { AddItem } from './AddItem';

interface HeaderProps {
	isMyStore: boolean;
}

export const Header = ({ isMyStore }: HeaderProps) => {
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();
	return (
		<>
			<div className='bg-white text-gray-600 work-sans leading-normal text-base tracking-normal'>
				<nav id='header' className='w-full z-30 top-0 py-1'>
					<div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3'>
						<label className='cursor-pointer md:hidden block'>
							<svg
								className='fill-current text-gray-900'
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='20'
								viewBox='0 0 20 20'>
								<title>menu</title>
								<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
							</svg>
						</label>
						<input className='hidden' type='checkbox' id='menu-toggle' />

						<div
							className='hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1'
							id='menu'>
							<nav>
								<ul className='md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0'>
									<li>
										<a
											className='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl'
											href='#'>
											<svg
												className='fill-current text-gray-800 mr-2'
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'>
												<path d='M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z' />
											</svg>
											Pet-Connect
										</a>
									</li>
								</ul>
							</nav>
						</div>

						<div
							className='order-2 md:order-3 flex items-center'
							id='nav-content'>
							<div
								className='inline-block no-underline hover:text-black cursor-pointer'
								onClick={(e) => {
									router.push('/cart');
								}}>
								<MdOutlineShoppingCart size={24} />
							</div>

							{isMyStore && (
								<div
									className='pl-3 inline-block no-underline hover:text-black cursor-pointer'
									onClick={() => {
										setShowModal(true);
									}}>
									<MdAdd size={28} />
								</div>
							)}
						</div>
					</div>
				</nav>
			</div>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[45%] my-6 mx-auto'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-2xl font-semibold'>Add Item</h3>
									<button
										className='p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold'
										onClick={() => setShowModal(false)}>
										<span className='text-black h-6 w-6 text-2xl block'>×</span>
									</button>
								</div>
								{/*body*/}
								<div className='px-8 py-5'>
									<AddItem />
								</div>
								{/*footer*/}
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => setShowModal(false)}>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
};
