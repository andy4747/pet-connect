import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
	mutation sendMessage($username: String!, $content: String!) {
		sendMessage(username: $username, content: $content) {
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
