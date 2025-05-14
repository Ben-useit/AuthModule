import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { getSession } from '@/lib/session';
import { AuthProvider } from '@/context';
import LoginPage from './login/page';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'UseIT!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();
  return (
    <html lang='en'>
      <body
        style={{ backgroundColor: '#b1aea9' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AuthProvider initialUser={user}>
          {!user ? (
            <LoginPage />
          ) : (
            <>
              <Navbar />
              <div className='w-4/5 min-h-screen mx-auto text-center mt-10 text-3xl '>
                {children}
              </div>
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
