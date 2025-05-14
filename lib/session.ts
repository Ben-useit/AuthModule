import { SignJWT, jwtVerify } from 'jose';
import { Session, type User } from './types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Session) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ''
): Promise<Session | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as Session;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(token: string, expires: Date) {
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  if (!session) return null;
  return session;
}

export async function updateSession(request: NextRequest) {
  const session = await getSession();
  if (!session) return;

  session.expires = new Date(Date.now() + 60 * 60 * 1000); // 5min
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });
  return res;
}
