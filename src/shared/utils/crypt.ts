import bcrypt from 'bcryptjs';

export const HashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const ComparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
