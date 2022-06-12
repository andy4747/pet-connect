import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Register as RegisterComp } from '../components/auth/Register';
import { authenticated } from '../HOC/authenticated';

const Register: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Register</title>
			</Head>
			<RegisterComp></RegisterComp>
		</div>
	);
};

export default Register;

export const getServerSideProps: GetServerSideProps = authenticated(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
