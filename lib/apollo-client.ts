import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Mock GraphQL endpoint - in production, replace with your actual GraphQL API
const httpLink = createHttpLink({
  uri: 'https://api.example.com/graphql', // Replace with your GraphQL endpoint
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

