import { SignJWT, jwtVerify } from 'jose';
import { type User } from './types';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(user: User) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ''
): Promise<User | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as User;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set('user', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const session = (await cookies()).get('user')?.value;
  if (!session) return null;
  const user = await decrypt(session);
  if (!user) return null;
  return user;
}
