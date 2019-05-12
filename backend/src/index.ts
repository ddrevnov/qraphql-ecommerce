import { GraphQLServer } from 'graphql-yoga';
import * as mkdirp from 'mkdirp';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import resolvers from './resolvers';
import db from './db';
import { UPLOAD_DIR, APP_SECRET, PORT, FRONTEND_URL } from './config';
import { Req } from './utils/Context';

mkdirp.sync(UPLOAD_DIR);

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

server.express.use('/uploads', express.static('uploads'));

server.express.use((req: Req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as {
      userId: string;
    };

    if (userId) {
      req.userId = userId;
    }
  }

  next();
});

const options = {
  port: PORT,
  cors: {
    credentials: true,
    origin: FRONTEND_URL
  }
};

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
