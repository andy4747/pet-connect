import React, { useState } from 'react';

export const AddItem = () => {
	const [picture, setPicture] = useState<File | null>(null);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imgFile = await e.currentTarget.files!.item(0)!;
		if (imgFile) setPicture(imgFile);
	};

	const clearInputs = () => {
		setPicture(null);
		setName('');
		setPrice('');
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const productData = new FormData();
		productData.append('product-image', picture!);
		productData.append('productName', name);
		productData.append('productPrice', price);

		const response = await fetch('http://localhost:5000/product', {
			body: productData,
			method: 'post',
			credentials: 'include',
		});

		const respData = await response.text();
		console.log(respData);

		//clearing the form
		clearInputs();
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				{/* Name Input */}
				<div className='mt-8'>
					<label
						htmlFor='Title'
						className='block text-sm font-medium text-gray-700'>
						Product Name
					</label>
					<div className='mt-1'>
						<input
							type='text'
							className='shadow-sm focus:outline-none w-full focus:border-indigo-500 mt-1 block sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
							placeholder='Product Name'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
				</div>
				{/* Price Input */}
				<div className='mt-8'>
					<label
						htmlFor='Title'
						className='block text-sm font-medium text-gray-700'>
						Price (Rs.)
					</label>
					<div className='mt-1'>
						<input
							type='text'
							className='shadow-sm focus:outline-none w-full focus:border-indigo-500 mt-1 block sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
							placeholder='000'
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
					</div>
				</div>

				{/* Image Upload */}
				<div className='lg:inline-grid lg:grid-cols-9 lg:gap-[130px] mt-8'>
					<div className='lg:col-span-4'>
						<label
							htmlFor='Title'
							className='block text-sm font-medium text-gray-700'>
							Upload Picture
						</label>
						<div className='flex bg-grey-lighter'>
							<label
								className={`w-[40%] py-1 flex flex-col items-center bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue`}>
								<svg
									className='w-5 h-5'
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>
								<span className='mt-2 text-base leading-normal'>
									Select Image
								</span>
								<input type='file' className='hidden' onChange={onFileChange} />
							</label>
						</div>
					</div>
					<div className='lg:col-span-5'></div>
				</div>

				{/* Close Button */}
				<div className='px-4 py-3 text-right sm:px-8'>
					<button
						type='submit'
						className='inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};
