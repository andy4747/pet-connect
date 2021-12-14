import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Home as PublicHome } from '../components/Home';

const Home: NextPage = () => {
	const { data, loading, error } = useQuery(gql`
		{
			run
		}
	`);

	if (loading) {
		return <div>loading...</div>;
	}

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
