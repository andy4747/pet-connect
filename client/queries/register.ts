import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
	mutation register(
		$email: String!
		$username: String!
		$password: String!
		$role: String!
	) {
		register(
			email: $email
			username: $username
			password: $password
			role: $role
		)
	}
`;
