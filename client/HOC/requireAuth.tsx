import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function requireAuth(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req, res } = context;
		const token = req.cookies.stfpcambad;
		if (!token) {
			// Redirect to login page
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		return await gssp(context); // Continue on to call `getServerSideProps` logic
	};
}
