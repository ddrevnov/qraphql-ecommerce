import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ThemeProvider } from 'styled-components';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'antd/dist/antd.css';

import { ENDPOINT, PROD_ENDPOINT } from './config';
import Header from './components/Header';
import Router from './Router';

const { Content, Footer } = Layout;

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

export const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NODE_ENV === 'development' ? ENDPOINT : PROD_ENDPOINT,
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Header />
            <Content
              style={{
                padding: '0 50px',
                marginTop: 64
              }}
            >
              <Router />
            </Content>
            <Footer
              style={{
                textAlign: 'center'
              }}
            >
              Created by Denis Drevnov
            </Footer>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
