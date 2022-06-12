import { useMutation } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { FC, useState } from 'react';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import Logo from '../../public/logo/logo-dark.svg';
import LoginSVG from '../../public/misc/login.svg';
import { Alert } from '../util/Alert';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAlerted, setIsAlerted] = useState(false);
	const [loginUser, { error }] = useMutation(LOGIN_MUTATION);

	return (
		<>
			<div className='lg:flex font-Poppins'>
				<div className='lg:w-1/2 xl:max-w-screen-sm'>
					{isAlerted === true && (
						<Alert
							type='danger'
							message='Login Failed. Incorrect Credentials'
						/>
					)}
					<div className='py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'>
						<div className='cursor-pointer flex items-center mx-auto'>
							<div>
								<Image
									src={Logo}
									alt=''
									width={100}
									height={200}
									onClick={() => {
										Router.push('/');
									}}
								/>
							</div>
							<div className='text-3xl mt-8 text-pet-indigo tracking-wide ml-6 font-semibold'>
								<Link href='/' passHref>
									<a>PetConnect</a>
								</Link>
							</div>
						</div>
					</div>
					<div className='mt-10 px-12 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl'>
						<h2
							className='text-center text-4xl text-pet-indigo font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold'>
							Login
						</h2>
						<div className='mt-12'>
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									const resp = await loginUser({
										variables: {
											email: email,
											password: password,
										},
									});
									if (resp && resp.data) {
										if (resp.data.login.accessToken !== '') {
											setEmail('');
											setPassword('');
											localStorage.setItem(
												'access_token',
												resp.data.login.accessToken
											);
											Router.push('/dashboard');
										} else {
											setIsAlerted(true);
										}
									}
								}}>
								<div>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Email Address
									</div>
									<input
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
										type=''
										placeholder='example@mail.com'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
								<div className='mt-8'>
									<div className='flex justify-between items-center'>
										<div className='text-sm font-bold text-gray-700 tracking-wide'>
											Password
										</div>
										<div>
											<a
												className='hidden text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                cursor-pointer'>
												Forgot Password?
											</a>
										</div>
									</div>
									<input
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
										type='password'
										placeholder='Enter your password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								{isAlerted && (
									<p className='mt-4 text-pet-red'>
										Invalid Credentials Login Failed
									</p>
								)}
								<div className='mt-10'>
									<button
										className='bg-pet-indigo text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-900
                        shadow-lg'>
										Log In
									</button>
								</div>
							</form>
							<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
								Dont have an account ?{' '}
								<Link href='/register'>
									<a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
										Register
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className='hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen'>
					<div className='max-w-xs transform duration-200 hover:scale-110 cursor-pointer'>
						{/* img here */}
						<Image src={LoginSVG} alt='main img' className='w-5/6 mx-auto' />
					</div>
				</div>
			</div>
		</>
	);
};
