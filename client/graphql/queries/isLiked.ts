import { gql } from '@apollo/client';

export const IS_LIKED_QUERY = gql`
	query isLiked($postId: Number!) {
		isLiked(postId: $postId)
	}
`;
