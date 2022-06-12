import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { MyStore } from '../components/store/MyStore';
import { requireAuth } from '../HOC/requireAuth';

const Store: NextPage = () => {
	return (
		<>
			<MyStore />
		</>
	);
};

export default Store;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
