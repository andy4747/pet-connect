import axios from 'axios';

describe('POST /like/total/:postId', () => {
	describe('given postId', () => {
		it('returns object that have property liked', async () => {
			const response = await axios.get(`http://localhost:5000/like/total/${1}`);
			const data = await response.data;
			expect(data.likes).toBeDefined();
		});
	});
});
