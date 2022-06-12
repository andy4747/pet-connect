import { useState } from 'react';

export const Sell = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [species, setSpecies] = useState('');
	const [price, setPrice] = useState(0);
	const [color, setColor] = useState('');
	const [age, setAge] = useState(0);
	const [picture, setPicture] = useState<File | null>(null);

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imgFile = await e.currentTarget.files!.item(0)!;
		if (imgFile) setPicture(imgFile);
	};

	/* function to clear the form after submission */
	const clearBuyInputs = () => {
		setTitle('');
		setBody('');
		setSpecies('');
		setPrice(0);
		setColor('');
		setAge(0);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//creating a FormData object and storing user input in the object
		const buyData = new FormData();
		buyData.append('post-image', picture!);
		buyData.append('title', title);
		buyData.append('body', body);
		buyData.append('species', species);
		buyData.append('color', color);
		buyData.append('price', String(price));
		buyData.append('age', String(age));

		//posting data to the server
		const response = await fetch('http://localhost:5000/post-sell', {
			body: buyData,
			method: 'post',
			credentials: 'include',
		});

		const respData = await response.text();
		console.log(respData);

		//clearing the form
		clearBuyInputs();
	};

	return (
		<form onSubmit={onSubmit}>
			{/* Title Input */}
			<div>
				<label
					htmlFor='Title'
					className='block text-sm font-medium text-gray-700'>
					Title
				</label>
				<div className='mt-1'>
					<input
						type='text'
						className='shadow-sm focus:outline-none focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
						placeholder='Title'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
			</div>

			{/* Description Input */}
			<div className='mt-6'>
				<label
					htmlFor='about'
					className='block text-sm font-medium text-gray-700'>
					About
				</label>
				<div className='mt-1'>
					<textarea
						id='about'
						name='about'
						rows={5}
						className='shadow-sm focus:outline-none focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-[#d1d5db] rounded-md focus:text-base placeholder:pl-2'
						placeholder='Brief description about the post.'
						value={body}
						onChange={(e) => {
							setBody(e.target.value);
						}}
					/>
				</div>
			</div>

			{/* Age & Color */}

			<div className='lg:inline-grid lg:grid-cols-9 lg:gap-[130px] mt-6'>
				<div className='lg:col-span-4'>
					<label
						htmlFor='Title'
						className='block text-sm font-medium text-gray-700'>
						Age
					</label>
					<input
						type='number'
						placeholder='10'
						className='shadow-sm focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
						value={age}
						onChange={(e) => {
							setAge(Number(e.target.value));
						}}
					/>
				</div>
				<div className='lg:col-span-5'>
					<label className='block text-sm font-medium text-gray-700'>
						Color
					</label>
					<input
						type='text'
						placeholder='Red'
						className='shadow-sm focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
						value={color}
						onChange={(e) => {
							setColor(e.target.value);
						}}
					/>
				</div>
			</div>

			{/* Species and pet price input */}
			<div className='lg:inline-grid lg:grid-cols-9 lg:gap-[130px] mt-6'>
				<div className='lg:col-span-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Species
					</label>
					<input
						type='text'
						placeholder='Dog'
						className='shadow-sm focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
						value={species}
						onChange={(e) => {
							setSpecies(e.target.value);
						}}
					/>
				</div>
				<div className='lg:col-span-5'>
					<label className='block text-sm font-medium text-gray-700'>
						Price
					</label>
					<input
						type='text'
						placeholder='10000'
						className='shadow-sm focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border border-[#d1d5db] rounded-md py-3 focus:text-base placeholder:pl-4'
						value={price}
						onChange={(e) => {
							setPrice(Number(e.target.value));
						}}
					/>
				</div>
			</div>

			{/* Upload Button */}
			<div className='lg:inline-grid lg:grid-cols-9 lg:gap-[130px] mt-6'>
				<div className='lg:col-span-4'>
					<label
						htmlFor='Title'
						className='block text-sm font-medium text-gray-700'>
						Upload Picture
					</label>
					<div className='flex bg-grey-lighter'>
						<label
							className={`w-[100%] py-1 flex flex-col items-center bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue`}>
							<svg
								className='w-5 h-5'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'>
								<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
							</svg>
							<span className='mt-2 text-base leading-normal'>
								Select an image
							</span>
							<input type='file' className='hidden' onChange={onFileChange} />
						</label>
					</div>
				</div>
				<div className='lg:col-span-5'></div>
			</div>
			<div className='px-4 py-3 bg-gray-50 text-right sm:px-6 mt-6'>
				<button
					type='submit'
					className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					Save
				</button>
			</div>
		</form>
	);
};
