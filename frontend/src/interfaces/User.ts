export interface IUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  permissions: string[];
  cart?: any[];
}
