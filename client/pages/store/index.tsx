import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { StoreList } from '../../components/store/StoreList';
import { requireAuth } from '../../HOC/requireAuth';

const Stores: NextPage = () => {
	return (
		<>
			<StoreList />
		</>
	);
};

export default Stores;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
