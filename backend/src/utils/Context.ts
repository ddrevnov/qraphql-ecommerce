import { Prisma } from 'prisma-binding';
import { Request } from 'express';

interface Req extends Request {
  userId?: string;
}

export default interface Context {
  db: Prisma;
  request: Req;
  response: any;
}
