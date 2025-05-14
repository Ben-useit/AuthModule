'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import profilImage from '@/images/Youma Wague.png';
import Image from 'next/image';
import { useAuth } from '@/context';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Card', href: '/card', current: false },
  { name: 'Learn', href: '/learn', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [currentPathname, setCurrentPathname] = useState<string>('/');
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    location.reload();
  };
  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  });

  return (
    <Disclosure as='nav' className='bg-[#635f5c]'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon
                aria-hidden='true'
                className='block size-6 group-data-open:hidden'
              />
              <XMarkIcon
                aria-hidden='true'
                className='hidden size-6 group-data-open:block'
              />
            </DisclosureButton>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex shrink-0 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
                />
              </svg>
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setCurrentPathname(item.href)}
                    aria-current={
                      item.href === currentPathname ? 'page' : undefined
                    }
                    className={classNames(
                      item.href === currentPathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              type='button'
              className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'
            >
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>View notifications</span>
              <BellIcon aria-hidden='true' className='size-6' />
            </button>

            {/* Profile dropdown */}
            <Menu as='div' className='relative ml-3'>
              <div>
                <MenuButton className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  <Image
                    alt='Profil Image'
                    src={profilImage}
                    className='size-8 rounded-full'
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
              >
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden'
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden'
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  {/* <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden'
                  >
                    Sign out
                  </a> */}
                  <form action={handleLogout} className='inline'>
                    <button
                      type='submit'
                      className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer'
                    >
                      Sign out
                    </button>
                  </form>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className='sm:hidden'>
        <div className='space-y-1 px-2 pt-2 pb-3'>
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as='a'
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
