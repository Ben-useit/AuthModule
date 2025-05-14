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
  // 10 seconds?
  const expires = new Date(Date.now() + 10 * 1000);
  const token = await encrypt({ user, expires });
  await createSession(token, expires);
  return user;
};
