import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import isomorthicApollo from '../util/isomorthicApollo';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import '../styles.css';

interface AppProps {
    apollo: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<AppProps> {
    render() {
        const { Component, pageProps, apollo } = this.props;

        return (
            <ApolloProvider client={apollo}>
                <Component {...pageProps} />
            </ApolloProvider>
        );
    }
}

export default isomorthicApollo(MyApp);
