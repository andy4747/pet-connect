import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Login as LoginComp } from '../components/auth/Login';
import { authenticated } from '../HOC/authenticated';

const Login: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Login</title>
			</Head>
			<LoginComp></LoginComp>
		</div>
	);
};

export default Login;

export const getServerSideProps: GetServerSideProps = authenticated(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
