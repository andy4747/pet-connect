import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { UserProfile } from '../../components/profile/UserProfile';
import { requireAuth } from '../../HOC/requireAuth';

const ProfileUser: NextPage = () => {
	const router = useRouter();
	return (
		<>
			<UserProfile username={router.query.username as string} />
		</>
	);
};

export default ProfileUser;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
