import * as jwt from 'jsonwebtoken';
import Context from './Context';
import AuthError from './AuthError';

export default function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}
