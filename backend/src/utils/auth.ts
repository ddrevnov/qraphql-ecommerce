import * as jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  return `Bearer ${jwt.sign({ userId }, process.env.APP_SECRET)}`;
};

const setCookie = (response: any, token: string): void => {
  response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
};

export default {
  generateToken,
  setCookie
};
