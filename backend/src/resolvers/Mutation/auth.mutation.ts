import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { Context, auth, MailService } from "../../utils";
import { User } from "../../generated/prisma-client";
import { MAIL_HOST, FRONTEND_URL, RESET_TOKEN_SECRET } from "../../config";

interface AuthResponse {
  user: User;
  token: string;
}

const signUp = async (
  parent,
  { email, password, name },
  { db, response }: Context,
  info
): Promise<AuthResponse> => {
  const hashedPassword = await auth.hashPassword(password);
  const user = await db.mutation.createUser(
    {
      data: {
        password: hashedPassword,
        email,
        name,
        permissions: { set: ["USER"] }
      }
    },
    info
  );

  const token = auth.generateToken({
    userId: user.id
  });

  return {
    user,
    token
  };
};

const signIn = async (
  parent,
  { email, password },
  { db }: Context,
): Promise<AuthResponse> => {
  const user = await db.query.user({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = auth.generateToken({
    userId: user.id
  });

  return {
    user,
    token
  };
};

const requestReset = async (parent, { email }, { db }: Context) => {
  const user = await db.query.user({ where: { email } });

  if (!user) {
    throw new Error(`User not found for email ${email}`);
  }

  const token = auth.generateToken({
    userId: user.id,
    secret: RESET_TOKEN_SECRET,
    options: {
      expiresIn: Date.now() + 3600000 // 1 hour from now
    }
  });
  const mailService = new MailService();

  await mailService.sendMail({
    from: MAIL_HOST,
    to: user.email,
    subject: "Reset password",
    html: `
      If you want to reset your password, please click this link:
      <a href="${FRONTEND_URL}/reset/${token}">Reset password</a>
    `
  });

  return { message: "Thanks" };
};

const resetPassword = async (
  parent,
  { password, confirmPassword, resetToken },
  { db }: Context
): Promise<AuthResponse> => {
  if (password !== confirmPassword) {
    throw new Error("your password don't match");
  }

  const { userId } = jwt.verify(resetToken, RESET_TOKEN_SECRET) as {
    userId: string;
  };

  const user = await db.query.user({
    where: { id: userId }
  });

  if (!user) {
    throw new Error("This token is either invalid or expired");
  }

  const hashedPassword = await auth.hashPassword(password);
  const updatedUser = await db.mutation.updateUser({
    where: { id: user.id },
    data: {
      password: hashedPassword
    }
  });
  const token = auth.generateToken({
    userId: updatedUser.id
  });

  return {
    user: updatedUser,
    token
  };
};

export default {
  signUp,
  signIn,
  requestReset,
  resetPassword
};
