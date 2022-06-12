interface PostProps {
	id: Number;
	userName: string;
	postType: string;
	title: string;
	body: string;
	image: string;
	amount?: number;
	url?: string;
}

interface UploadButtonProps {
	width: string;
	height: string;
}

interface UserMessageProps {
	username: string;
}

interface MessageProps {
	id: number;
	message: string;
	senderUsername: string;
	receiverUsername: string;
}
