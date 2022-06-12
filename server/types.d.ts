export type UserRole = 'admin' | 'general' | 'org';

export interface UserResponse {
	id: number;
}

export interface Payload {
	userID: number;
	iat: number;
	exp: number;
}
