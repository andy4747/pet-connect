import type { NextPage } from 'next';

const Register: NextPage = () => {
	return (
		<div className='font-Poppins'>
			<div className='relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100'>
				<div className='relative sm:max-w-sm w-full'>
					<div className='relative w-full border rounded-3xl  px-6 py-4 bg-gray-200 shadow-md'>
						<label className='block mt-3 text-2xl text-gray-700 text-center font-semibold'>
							Register
						</label>
						<form method='#' action='#' className='mt-10'>
							<div>
								<input
									type='email'
									placeholder='		Email'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
								/>
							</div>

							<div className='mt-7'>
								<input
									type='text'
									placeholder='		Username'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
								/>
							</div>

							<div className='mt-7'>
								<input
									type='password'
									placeholder='		Password'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
								/>
							</div>

							<div className='mt-7'>
								<input
									type='password'
									placeholder='		Confirm Password'
									className='mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
								/>
							</div>

							<div className='mt-7'>
								<button className='bg-black w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
									Register
								</button>
							</div>

							<div className='mt-7'>
								<div className='flex justify-center items-center'>
									<label className='mr-2'>Already have an account?</label>
									<a
										href='#'
										className=' text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105'>
										Login
									</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
