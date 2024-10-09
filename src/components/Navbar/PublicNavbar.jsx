import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { RiLoginCircleFill } from 'react-icons/ri';

const PublicNavbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    { name: 'Home', path: '/', href: '/' },
    { name: 'Latest Articles', path: '/posts', href: 'posts' },
    { name: 'Creators Ranking', path: '/ranking', href: '/ranking' },
    { name: 'Pricing', path: '/pricing', href: '/pricing' },
  ];

  const handleItemClick = path => {
    setActiveItem(path);
  };

  return (
    <Disclosure as='nav' className='bg-gray-100 drop-shadow-sm'>
      {({ open }) => (
        <>
          <div className='mx-auto px-4 sm:px-8 lg:px-8 bg-gray-100'>
            <div className='flex w-full h-16 justify-between'>
              <div className='flex'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-orange-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-shrink-0 items-center'>
                  {/* Logo */}
                  <img
                    src='https://i.ibb.co.com/C9YyGkN/Logo.png'
                    className='h-10 w-auto'
                    alt='Logo'
                  />
                </div>
                <div className='hidden md:ml-6 md:flex md:space-x-8'>
                  {navItems.map(item => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                        activeItem === item.path
                          ? 'border-orange-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-orange-200 hover:text-gray-700'
                      }`}
                      onClick={() => handleItemClick(item.path)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <Link
                    to='/register'
                    className='relative inline-flex items-center gap-x-1.5 rounded-full bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 animate-pulse'
                  >
                    <RiLoginCircleFill
                      className='-ml-0.5 h-5 w-5'
                      aria-hidden='true'
                    />
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              {navItems.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.path}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    activeItem === item.path
                      ? 'border-orange-500 bg-orange-100 text-orange-700'
                      : 'border-transparent text-gray-500 hover:border-orange-300 hover:bg-orange-200 hover:text-gray-700'
                  } sm:pl-5 sm:pr-6`}
                  onClick={() => handleItemClick(item.path)}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;
