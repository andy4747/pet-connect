import { gql } from '@apollo/client';

export const GET_CHAT_LIST = gql`
	query getChatList {
		getChatList {
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
