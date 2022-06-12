import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_CHAT_LIST } from '../../graphql/queries/getChatList';
import { DashboardLayout } from '../util/DashboardLayout';
import { Loading } from '../util/Loading';

export const ChatList = () => {
	const router = useRouter();
	const { data, loading, error } = useQuery(GET_CHAT_LIST, {
		pollInterval: 1500,
	});
	if (loading) return <Loading />;

	const onMessageClick = (username: string) => {
		return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			router.push(`/chats/${username}`);
		};
	};

	return (
		<DashboardLayout pageName='Chats'>
			<div className='container'>
				{data &&
					data.getChatList.map((chatItem: any) => {
						return (
							<div
								key={chatItem.id}
								className='w-[80%] border-1 rounded-md bg-gray-300 shadow mt-4 p-4 mx-auto'
								onClick={onMessageClick(chatItem.receiverUsername)}>
								<div className='flex'>
									<p className='text-green-600 flex-1'>
										{chatItem.receiverUsername}
									</p>
									<p className='font-light text-sm float-right'>
										{chatItem.createdAt}
									</p>
								</div>
								{/* content */}
								<div className='mt-4'>
									<p>{chatItem.content}</p>
								</div>
							</div>
						);
					})}
			</div>
		</DashboardLayout>
	);
};
