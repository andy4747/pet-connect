import Link from 'next/link';
import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';

export const Quickbar = () => {
	const [hamState, setHamState] = useState(false);
	return (
		<header className='font-Poppins'>
			<nav className='container flex items-center py-4 mt-4 sm:mt-12'>
				<div className='py-1 cursor-pointer'>
					<Link href={'/dashboard'} passHref>
						<HiArrowLeft size={36} />
					</Link>
				</div>
			</nav>
		</header>
	);
};
