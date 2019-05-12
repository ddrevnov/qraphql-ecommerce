import * as dotenv from 'dotenv';
dotenv.config();

export const {
  PRISMA_SECRET,
  APP_SECRET,
  FRONTEND_URL,
  PRISMA_ENDPOINT,
  UPLOAD_DIR,
  PORT,
  SALT,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  RESET_TOKEN_SECRET
} = process.env;
