import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Home as PublicHome } from '../components/home/Home';
import { authenticated } from '../HOC/authenticated';

const Home: NextPage = () => {
	return (
		<div className='font-Poppins'>
			<Head>
				<title>PetConnect</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta charSet='UTF-8' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PublicHome />
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = authenticated(
	async (_ctx) => {
		return {
			props: {},
		};
	}
);
