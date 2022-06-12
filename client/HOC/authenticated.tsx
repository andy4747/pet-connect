import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function authenticated(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req, res } = context;
		const token = req.cookies.stfpcambad;
		if (token) {
			// Redirect to dashboard page
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false,
				},
			};
		}

		return await gssp(context); // Continue on to call `getServerSideProps` logic
	};
}
