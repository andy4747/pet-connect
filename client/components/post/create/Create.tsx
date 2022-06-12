import { useState } from 'react';
import { Adopt } from './Adopt';
import { Buy } from './Buy';
import { Donate } from './Donate';
import { Lost } from './Lost';
import { Sell } from './Sell';

export const Create = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [postType, setPostType] = useState('buy');
	const [isAlerted, setIsAlerted] = useState(false);

	return (
		<div className='mt-4'>
			<div className='mt-5 md:mt-0 md:col-span-2'>
				<div className='shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-md sm:overflow-hidden'>
					<div className='px-4 py-4 bg-white space-y-7 sm:p-6'>
						<div className='post-type mt-2'>
							<label className='block text-sm font-medium text-gray-700'>
								Post Type
							</label>
							<select
								className='border border-[#d1d5db] rounded-md w-full py-4 p-4 bg-white'
								onChange={(e) => {
									setPostType(e.target.value);
								}}
								value={postType}>
								<option value='donate'>Donate</option>
								<option value='adopt'>Adopt</option>
								<option value='buy'>Buy</option>
								<option value='sell'>Sell</option>
								<option value='lost'>Lost</option>
							</select>
						</div>
						{/* conditional rendering */}
						{postType === 'buy' && <Buy />}
						{postType === 'sell' && <Sell />}
						{postType === 'adopt' && <Adopt />}
						{postType === 'donate' && <Donate />}
						{postType === 'lost' && <Lost />}
					</div>
				</div>
			</div>
		</div>
	);
};
