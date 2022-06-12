import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Store as UserStore } from '../../components/store/Store';
import { requireAuth } from '../../HOC/requireAuth';

const Store: NextPage = () => {
	const router = useRouter();
	return <UserStore storeId={Number(router.query.storeId)} />;
};

export default Store;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
