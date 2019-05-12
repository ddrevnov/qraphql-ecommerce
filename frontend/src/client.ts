import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ENDPOINT, PROD_ENDPOINT } from './config';
import { AUTH_TOKEN } from './shared/constants';

const http = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? ENDPOINT : PROD_ENDPOINT,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(http),
  cache: new InMemoryCache()
});

export default client;
