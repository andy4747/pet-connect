import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Dashboard as Dash } from '../components/dashboard/Dashboard';
import { requireAuth } from '../HOC/requireAuth';

const Dashboard: NextPage = () => {
	return <Dash />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
