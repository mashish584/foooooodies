import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import fetch from "isomorphic-unfetch";
import { serverEndpoint, serverLiveEndpoint } from "../data/config";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch;
}

function create(initialState, { getToken, headers }) {
	const httpLink = createHttpLink({
		uri:
			process.env.NODE_ENV !== "production" ? serverEndpoint : serverLiveEndpoint,
		credentials: "include",
		headers
	});

	const uploadLink = createUploadLink({
		uri:
			process.env.NODE_ENV !== "production" ? serverEndpoint : serverLiveEndpoint,
		credentials: "include",
		headers
	});

	const authLink = setContext((_, { headers }) => {
		const token = getToken();
		return {
			headers: {
				...headers
			}
		};
	});

	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	return new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link: authLink.concat(uploadLink),
		cache: new InMemoryCache().restore(initialState || {})
	});
}

export default function initApollo(initialState, options) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState, options);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState, options);
	}

	return apolloClient;
}
