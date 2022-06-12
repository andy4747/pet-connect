import { gql } from '@apollo/client';

export const GET_USER_FEED = gql`
	query {
		userFeed {
			id
			userId
			title
			body
			image
			updatedAt
			createdAt
			username
			postType
			price
		}
	}
`;
