import { gql } from '@apollo/client';

export const GET_PROFILE_DATA = gql`
	query getProfileData {
		getProfileData {
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
		me {
			id
			email
			username
		}
	}
`;
