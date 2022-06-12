import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER_FEED } from '../../graphql/queries/getUserFeed';
import { Post } from '../post/Post';
import { DashboardLayout } from '../util/DashboardLayout';
import { Loading } from '../util/Loading';

interface DataResponse {
	id: number;
	userId: number;
	title: string;
	body: string;
	image: string;
	updatedAt: string;
	createdAt: string;
	username: string;
	price: number;
	postType: string;
}

export const Dashboard = () => {
	const { data, loading, error } = useQuery(GET_USER_FEED);

	if (loading) {
		return <Loading />;
	}

	return (
		<DashboardLayout pageName='Dashboard'>
			{console.log(data)}
			<></>
			{data.userFeed.map((post: DataResponse) => {
				if (post.postType === 'buy') {
					return (
						<Post
							id={Number(post.id)}
							postType={post.postType}
							userName={post.username}
							title={post.title}
							body={post.body}
							image={post.image}
							amount={Number(post.price)}
							url={'http://localhost:5000/'}
							key={post.id}
						/>
					);
				} else {
					return (
						<Post
							id={Number(post.id)}
							postType={post.postType}
							userName={post.username}
							title={post.title}
							body={post.body}
							image={post.image}
							url={'http://localhost:5000/'}
							key={post.id}
						/>
					);
				}
			})}
		</DashboardLayout>
	);
};
