import { Prisma } from 'prisma-binding';

export default interface Context {
  db: Prisma;
  request: any;
  response: any;
}
