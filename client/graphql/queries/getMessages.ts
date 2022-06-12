import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
	query getMessages($username: String!) {
		getMessages(username: $username) {
			id
			content
			from
			to
			createdAt
			senderUsername
			receiverUsername
		}
	}
`;
