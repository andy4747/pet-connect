import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Create } from '../components/post/create/Create';
import { DashboardLayout } from '../components/util/DashboardLayout';
import { requireAuth } from '../HOC/requireAuth';

const post: NextPage = () => {
	return (
		<DashboardLayout pageName='Post'>
			<Create />
		</DashboardLayout>
	);
};

export default post;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
