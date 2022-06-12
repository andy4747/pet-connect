import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_USER_PROFILE } from '../../graphql/queries/getUserProfile';
import { DashboardLayout } from '../util/DashboardLayout';
import { Loading } from '../util/Loading';

interface Props {
	username: string;
}

export const UserProfile = ({ username }: Props) => {
	const { data, loading, error } = useQuery(GET_USER_PROFILE, {
		variables: { username: username },
	});
	const router = useRouter();
	if (loading) return <Loading />;
	console.log(data);
	return (
		<DashboardLayout pageName='Profile'>
			<div className='w-[80%] mx-auto'>
				<div className='px-3 py-2'>
					<div className='flex flex-col gap-1 text-center'>
						<a
							className='block mx-auto bg-center bg-no-repeat bg-cover w-40 h-40 rounded-full border border-gray-400 shadow-lg'
							href=''
							style={{
								backgroundImage: `url(http://localhost:5000/post-image/${2})`,
							}}></a>
						<p className='font-serif font-semibold'>{username}</p>
					</div>
					<div className='flex justify-center items-center gap-2 my-3'>
						<div className='font-semibold text-center mx-4'>
							<p className='text-black'>
								{data && data.getUserProfile.posts.length}
							</p>
							<span className='text-gray-400'>Posts</span>
						</div>
						<div className='font-semibold text-center mx-4'>
							<p className='text-black'>
								{data && data.getUserProfile.followers.length}
							</p>
							<span className='text-gray-400'>Followers</span>
						</div>
						<div className='font-semibold text-center mx-4'>
							<p className='text-black'>
								{data && data.getUserProfile.following.length}
							</p>
							<span className='text-gray-400'>Folowing</span>
						</div>
					</div>

					<div className='flex justify-center gap-2 my-5'>
						<button className='bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg'>
							Follow
						</button>
						<button className='bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg'>
							Message
						</button>
					</div>
					<div className='grid grid-cols-3 gap-4 my-3 ml-3'>
						{data &&
							data.getUserProfile.posts.map((item: any) => {
								return (
									<div
										key={item.id}
										className='block bg-center bg-no-repeat bg-cover h-64 w-[100%] rounded-lg'>
										<Image
											src={`http://localhost:5000/post-image/${item.id}`}
											alt='a'
											className='rounded-lg'
											width={400}
											height={240}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};
