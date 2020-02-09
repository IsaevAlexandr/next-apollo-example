import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { apiUrl } from '../../config';

export default withApollo(
    ({ initialState /* , ctx, headers */ }) =>
        new ApolloClient({
            link: createHttpLink({
                fetch,
                uri: apiUrl,
            }),
            cache: new InMemoryCache().restore(initialState || {}),
        }),
);
