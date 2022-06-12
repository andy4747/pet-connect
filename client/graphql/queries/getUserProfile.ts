import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
	query getUserProfile($username: String!) {
		getUserProfile(username: $username) {
			posts {
				id
			}
			followers {
				id
				username
			}
			following {
				id
				username
			}
		}
	}
`;
