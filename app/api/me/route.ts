// app/api/me/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session'; // assuming your decrypt function is here

export async function GET() {
  const session = (await cookies()).get('user')?.value;

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await decrypt(session);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
