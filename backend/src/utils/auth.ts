import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { APP_SECRET } from '../config';

interface GenerateTokenInput {
  userId: string;
  secret?: string;
  options?: jwt.SignOptions;
}

const generateToken = ({
  userId,
  secret = APP_SECRET,
  options = {
    expiresIn: 1000 * 60 * 60 * 24 * 365
  }
}: GenerateTokenInput): string => {
  return jwt.sign({ userId }, secret, options);
};

const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export default {
  generateToken,
  hashPassword
};
