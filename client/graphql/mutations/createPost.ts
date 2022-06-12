import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
	mutation createPost($title: String!, $body: String!) {
		createPost(title: $title, body: $body)
	}
`;
