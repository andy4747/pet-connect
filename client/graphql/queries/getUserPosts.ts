import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
	query {
		userPost {
			id
			title
			body
		}
	}
`;
