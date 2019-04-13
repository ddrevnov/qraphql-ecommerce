import * as dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import * as mkdirp from 'mkdirp';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

import db from './db';
import resolvers from './resolvers';

mkdirp.sync(process.env.UPLOAD_DIR);

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: (request) => ({
    ...request,
    db
  })
});

server.express.use(cookieParser());
server.express.use('/uploads', express.static('uploads'));

const options = {
  port: process.env.PORT,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
};

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
