import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { ChatList } from '../../components/chat/ChatList';
import { requireAuth } from '../../HOC/requireAuth';

const Chat: NextPage = () => {
	return (
		<>
			<ChatList />
		</>
	);
};

export default Chat;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
