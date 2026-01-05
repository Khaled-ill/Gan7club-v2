'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode } from 'react';

// Create HTTP link
const httpLink = createHttpLink({
  uri: 'https://api.example.com/graphql', // Replace with your actual GraphQL endpoint
});

// Create auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from localStorage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

