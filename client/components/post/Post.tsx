import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';
import { Pay } from '../pay/Pay';

export const Post = ({
	id,
	postType,
	userName,
	amount,
	url,
	title,
	body,
	image,
}: PostProps) => {
	const [likeStatus, setLikeStatus] = useState(false);
	const [totalLikes, setTotalLikes] = useState(0);
	const [counter, setCounter] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const response = await fetch(`http://localhost:5000/like/status/${id}`, {
				method: 'GET',
				credentials: 'include',
			});
			const respBody = await response.json();
			if (respBody.liked === true) {
				setLikeStatus(true);
			}
		})();
	}, [id, likeStatus]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`http://localhost:5000/like/total/${id}`, {
				method: 'GET',
				credentials: 'include',
			});
			const respBody = await response.json();
			if (respBody.likes) {
				setTotalLikes(respBody.likes);
			}
		})();
	}, [id, counter, likeStatus]);

	const onCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(comment);
		const response = await fetch(`http://localhost:5000/comment/${id}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ comment: comment }),
		});
		setComment('');
		setCounter(counter + 1);
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(`http://localhost:5000/comment/all/${id}`, {
				method: 'GET',
				credentials: 'include',
			});
			const respBody = await response.json();
			setComments(respBody);
		})();
	}, [id, counter]);

	const onLikeClick = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		setCounter(counter + 1);
		const response = await fetch(`http://localhost:5000/like/${id}`, {
			method: 'GET',
			credentials: 'include',
		});
		const respBody = await response.json();
		if (respBody.liked === true) {
			setLikeStatus(true);
			setCounter(counter + 1);
		} else {
			setLikeStatus(false);
			setCounter(counter + 1);
		}
	};
	return (
		<>
			<div className='mx-auto my-10 sm:px-20  flex justify-center'>
				<div className=' rounded overflow-hidden border lg:w-8/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0'>
					<div className='w-full flex justify-between p-3'>
						<div className='flex'>
							<div className='rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden'>
								<Image
									src='https://avatars0.githubusercontent.com/u/38799309?v=4'
									alt='profilepic'
									width={50}
									height={50}
								/>
							</div>
							<span
								className='pt-1 ml-2 font-bold text-sm cursor-pointer'
								onClick={() => {
									router.push(`/profile/${userName}`);
								}}>
								{userName}
							</span>
						</div>
						<span className='px-2 hover:bg-gray-300 cursor-pointer rounded'>
							<i className='fas fa-ellipsis-h pt-2 text-lg'></i>
							<a>{postType}</a>
						</span>
					</div>
					<Image
						className='w-full bg-cover'
						src={image}
						alt='ds'
						width={750}
						height={500}
					/>
					<div className='px-3 pb-2'>
						<div className='pt-2'>
							{/* <i className='far fa-heart cursor-pointer'></i> */}
							{/* Like Dislike */}
							<div className='flex justify-between'>
								<span>
									<BsHeart
										size={25}
										color={`${likeStatus === true ? 'red' : 'black'}`}
										onClick={onLikeClick}
									/>
									<span className='text-sm text-gray-400 font-medium'>
										{totalLikes}
									</span>
								</span>
								{postType === 'buy' && (
									<Pay
										amount={amount! * 100}
										productUrl={url!}
										productId={String(id)}
										productName={title}
									/>
								)}
								<BiComment
									size={28}
									className='cursor-pointer'
									onClick={() => {
										setShowModal(true);
									}}
								/>
							</div>
						</div>
						<div className='pt-1'>
							<div className='mb-2 text-base'>{title}</div>
							<div className='mb-2 text-base font-medium'>{body}</div>
						</div>
					</div>
				</div>
			</div>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[65%] my-6 mx-auto'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-2xl font-semibold'>Comments</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={() => setShowModal(false)}>
										<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='px-8 py-5'>
									<form
										className='flex flex-row gap-4'
										onSubmit={onCommentSubmit}>
										<textarea
											id='about'
											name='about'
											rows={3}
											value={comment}
											onChange={(e) => {
												setComment(e.target.value);
											}}
											className='shadow-sm focus:outline-none mt-1 block w-full sm:text-sm border border-[#d1d5db] rounded-md focus:text-base placeholder:pl-2'
											placeholder='Comment'
										/>
										{console.log(comments)}
										<input
											type='submit'
											value='Send'
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-10 rounded-xl'
										/>
									</form>
									<div>
										{comments.map((item: any, index) => {
											return (
												<div className='border p-4 mt-2' key={index}>
													<div className='flex clex-row'>
														<p className='font-semibold'>{item.username}</p>
													</div>
													<h1>{item.comment}</h1>
												</div>
											);
										})}
									</div>
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
