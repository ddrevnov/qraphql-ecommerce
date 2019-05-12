import { Prisma } from 'prisma-binding';
import { PRISMA_ENDPOINT, PRISMA_SECRET } from './config';

const db = new Prisma({
  typeDefs: 'src/generated/prisma-client/prisma.graphql',
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_SECRET,
  debug: false
});

export default db;
