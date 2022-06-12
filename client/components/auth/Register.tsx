import { useMutation } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { REGISTER_MUTATION } from '../../graphql/mutations/register';
import Logo from '../../public/logo/logo-dark.svg';
import LoginSVG from '../../public/misc/login.svg';
import { Alert } from '../util/Alert';

export const Register = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [role, setRole] = useState('general');
	const [isAlerted, setIsAlerted] = useState(false);
	const [registerUser, { data, loading, error }] =
		useMutation(REGISTER_MUTATION);

	return (
		<>
			<div className='lg:flex font-Poppins'>
				<div className='lg:w-1/2 xl:max-w-screen-sm'>
					{isAlerted === true && (
						<Alert
							type='danger'
							message='Registration Failed. Incorrect Credentials'
						/>
					)}
					<div className='bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'>
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
					<div className='px-12 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl'>
						<h2
							className='text-center text-4xl text-pet-indigo font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold'>
							Register
						</h2>
						<div className='mt-8'>
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									const resp = await registerUser({
										variables: {
											email: email,
											username: username,
											password: password,
											role: role,
										},
									});
									if (resp && resp.data) {
										if (resp.data.register === true) {
											setEmail('');
											setUsername('');
											setPassword('');
											setPassword2('');
											Router.push('/login');
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
										type='email'
										placeholder='example@mail.com'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
								<div className='mt-8'>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Username
									</div>
									<input
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
										type='text'
										placeholder='Username'
										value={username}
										onChange={(e) => {
											setUsername(e.target.value);
										}}
									/>
								</div>
								<div className='mt-8'>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Password
									</div>
									<input
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
										type='password'
										placeholder='Password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<div className='mt-8'>
									<div className='flex justify-between items-center'>
										<div className='text-sm font-bold text-gray-700 tracking-wide'>
											Confirm Password
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
										placeholder='Confirm Password'
										value={password2}
										onChange={(e) => {
											setPassword2(e.target.value);
										}}
									/>
								</div>
								{isAlerted && (
									<p className='mt-4 text-pet-red'>
										Invalid Credentials Registration Failed
									</p>
								)}
								<div className='mt-6'>
									<button
										className='bg-pet-indigo text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-900
                        shadow-lg'>
										Register
									</button>
								</div>
							</form>
							<div className='mt-8 text-sm font-display font-semibold text-gray-700 text-center'>
								Already have an account ?{' '}
								<Link href='/login'>
									<a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
										Login
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
