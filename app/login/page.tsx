'use client';
import { useActionState } from 'react';
import { actionLogin } from './action';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import secretImg from '@/images/kristina-flour-BcjdbyKWquw-unsplash.jpg';
import Image from 'next/image';

const LoginPage = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const handleLogin = async (status: any, formData: FormData) => {
    const result = await actionLogin(status, formData);
    if (typeof result === 'string') return result;
    setUser(result);
    router.push('/dashboard');
  };
  const [status, formAction, pending] = useActionState(handleLogin, null);
  return (
    <div className='relative min-h-screen'>
      <Image
        src={secretImg}
        alt={`Photo by Kristina Flour on https://unsplash.com/photos/grayscale-photo-of-woman-doing-silent-hand-sign-BcjdbyKWquw`}
        layout='fill'
        objectFit='cover'
        quality={100}
        className='z-0'
      />
      {/* <div className='absolute inset-0 bg-opacity-20 z-10'></div> */}
      {/* Content */}
      <div className='relative z-20 flex items-center justify-center h-full'>
        <div className='flex flex-col md:flex-row w-full max-w-7xl px-6'>
          {/* Left Text */}
          <div className='flex-1 flex items-center justify-center mb-10 mt-10 md:mb-5'>
            <h1 className='text-4xl font-bold text-white'>
              Sorry, not for everybody ...
            </h1>
          </div>

          {/* Login Form */}
          <div className='flex-1 flex items-center justify-center ml-24 mt-[200px]'>
            <form
              action={formAction}
              className='bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm space-y-4'
            >
              {status && <div className='text-white'>{status}</div>}
              <input
                type='text'
                placeholder='Username'
                name='username'
                className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
              />
              <button
                type='submit'
                disabled={pending}
                className='w-full py-2 bg-white text-black font-semibold rounded opacity-80 hover:opacity-100'
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className=''>
      <form action={formAction}>
        <div className='grid grid-cols1 gap-4 mx-auto w-3xl'>
          {status && <div>{status}</div>}
          <input
            className='m-3'
            type='text'
            name='username'
            placeholder='mail@mail.com'
          />
          <input
            className='m-3'
            type='password'
            name='password'
            placeholder='123456'
          />
          <button className='m-3 border rounded-md bg-amber-500' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
