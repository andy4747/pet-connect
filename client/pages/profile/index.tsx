import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Profile as ProfilePage } from '../../components/profile/Profile';
import { requireAuth } from '../../HOC/requireAuth';

const Profile: NextPage = () => {
	return <ProfilePage />;
};

export default Profile;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
