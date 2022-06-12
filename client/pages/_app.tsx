import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/index.css';

export const apolloClient = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
	credentials: 'include',
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;

// sm:
// md:
// lg:
