'use server';

import { validatePassword } from '@/lib/auth';
import { encrypt } from '@/lib/session';
import { createSession } from '@/lib/session';

export const actionLogin = async (status: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // 1. Validate Data and get user
  const user = await validatePassword(username, password);
  if (!user) return 'Na na na, nice try ...';

  const token = await encrypt(user);
  await createSession(token);
  return user;
};
