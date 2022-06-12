interface PostResponse {
	id: number;
	title: string;
	body: string;
	userId: number;
	updatedAt: Date;
	createdAt: Date;
	username: string;
	image: string;
	postType: PostType;
}

type PostType = 'adopt' | 'buy' | 'sell' | 'donate';
