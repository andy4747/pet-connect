import { useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Alert } from '../components/Alert';
import Logo from '../public/dog2.svg';
import { LOGIN_MUTATION } from '../queries/login';

const Login: NextPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAlerted, setIsAlerted] = useState(false);
	const [loginUser, { error }] = useMutation(LOGIN_MUTATION);
	return (
		<div className='font-Poppins'>
			{/* Navbar */}
			<nav className='container flex items-center sm:mt-12'>
				<Link href='/' passHref>
					<FaHome className='cursor-pointer' size={42}></FaHome>
				</Link>
			</nav>
			<div className='relative mt-16 flex flex-col sm:justify-center items-center bg-gray-100'>
				<div className='relative sm:max-w-sm w-full'>
					<div className='relative w-full rounded-3xl  px-6 py-4 bg-gray-200 shadow-md'>
						{isAlerted === true && (
							<Alert
								type='danger'
								message='Login Failed. Incorrect Credentials'
							/>
						)}
						<label className='block mt-3 text-2xl text-gray-700 text-center font-semibold'>
							<Image src={Logo} alt='logo' height='45px' width='45px' />
						</label>
						<label className='block mt-3 text-2xl text-gray-700 text-center font-semibold'>
							Login
						</label>
						<form
							className='mt-10'
							onSubmit={async (e) => {
								e.preventDefault();
								console.log(email);
								console.log(password);
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
										Router.push('/secret');
									} else {
										setIsAlerted(true);
									}
								}
							}}>
							<div>
								<input
									value={email}
									type='email'
									placeholder='		Email'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>

							<div className='mt-7'>
								<input
									value={password}
									type='password'
									placeholder='		Password'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>

							<div className='mt-7'>
								<button
									className='bg-black w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
									type='submit'>
									Login
								</button>
							</div>

							<div className='mt-7'>
								<div className='flex justify-center items-center'>
									<label className='mr-2'>Dont have an account?</label>
									<Link href='/register'>
										<a className=' text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105'>
											Register
										</a>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
