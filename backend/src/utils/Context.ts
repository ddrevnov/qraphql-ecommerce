import { Prisma } from 'prisma-binding';
import { Request } from 'express';

export interface Req extends Request {
  userId?: string;
}

export default interface Context {
  db: Prisma;
  request: Req;
  response: any;
}
