import { type User } from './types';
import bcrypt from 'bcrypt';

const testUser = {
  id: '1234',
  name: 'Youma Wague',
  lang: 'GER-ENG',
  password: '$2b$10$dQW3G6Uu4xze4XBYU22LBO1O7uZYxNXpyOccoCB4Fr2HKSAeu6BCm',
};

/**
 * Returns the user if it exists and password matches or null.
 *
 **/
export const validatePassword = async (
  username: string,
  password: string
): Promise<User | null> => {
  //Database query here
  const user = testUser;
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return { userId: user.id, name: user.name, lang: user.lang };
};
