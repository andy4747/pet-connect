import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Carts } from '../components/cart/Carts';
import { requireAuth } from '../HOC/requireAuth';

const Cart: NextPage = () => {
	return (
		<>
			<Carts />
		</>
	);
};

export default Cart;

export const getServerSideProps: GetServerSideProps = requireAuth(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
