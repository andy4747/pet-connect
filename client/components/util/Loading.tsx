import React from 'react';
import '../../styles/Loading.module.css';

export const Loading = () => {
	return (
		<div className='min-h-screen flex justify-center items-center bg-white'>
			<div className='loader bg-black p-5 rounded-full flex space-x-3'>
				<div className='w-5 h-5 bg-white rounded-full animate-bounce'></div>
				<div className='w-5 h-5 bg-white rounded-full animate-bounce'></div>
				<div className='w-5 h-5 bg-white rounded-full animate-bounce'></div>
			</div>
		</div>
	);
};
