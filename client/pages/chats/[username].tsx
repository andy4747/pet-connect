import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { UserMessage } from '../../components/chat/UserMessage';
import { DashboardLayout } from '../../components/util/DashboardLayout';
import { requireAuth } from '../../HOC/requireAuth';

const ChatUser: NextPage = () => {
	const router = useRouter();
	const username = router.query.username as string;
	return (
		<DashboardLayout pageName={username}>
			<UserMessage username={username} />
		</DashboardLayout>
	);
};

export default ChatUser;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
