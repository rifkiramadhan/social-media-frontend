import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, Outlet } from 'react-router-dom';
import {
  FaUserEdit,
  FaFileAlt,
  FaUsers,
  FaCalendarPlus,
  FaTags,
  FaWallet,
} from 'react-icons/fa';

const getInitialNavigation = () => {
  const currentPath = window.location.pathname; // Mendapatkan URL yang sedang dibuka

  const sidebarMenu = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: currentPath === '/dashboard',
    },
    {
      name: 'Create New Post',
      href: '/dashboard/create-post',
      icon: FaUserEdit,
      current: currentPath === '/dashboard/create-post',
    },
    {
      name: 'My Posts',
      href: '/dashboard/posts',
      icon: FaFileAlt,
      current: currentPath === '/dashboard/posts',
    },
    {
      name: 'My Followers',
      href: '/dashboard/my-followers',
      icon: FaUsers,
      current: currentPath === '/dashboard/my-followers',
    },
    {
      name: 'My Followings',
      href: '/dashboard/my-followings',
      icon: FaUsers,
      current: currentPath === '/dashboard/my-followings',
    },
    {
      name: 'Add New Category',
      href: '/dashboard/add-category',
      icon: FaTags,
      current: currentPath === '/dashboard/add-category',
    },
    {
      name: 'Create New Plan',
      href: '/dashboard/create-plan',
      icon: FaCalendarPlus,
      current: currentPath === '/dashboard/create-plan',
    },
    {
      name: 'My Earnings',
      href: '/dashboard/my-earnings',
      icon: FaWallet,
      current: currentPath === '/dashboard/my-earnings',
    },
    {
      name: 'Users',
      href: '/dashboard/users',
      icon: FaUsers,
      current: currentPath === '/dashboard/users',
    },
  ];

  return sidebarMenu;
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const UserDashboard = () => {
  const [navigation, setNavigation] = useState(getInitialNavigation);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigationClick = name => {
    //! Update localStorage dengan item yang diklik (opsional)
    localStorage.setItem('activeItem', name);

    //! Update state untuk mencerminkan item yang aktif
    setNavigation(prevNavigation =>
      prevNavigation.map(item =>
        item.name === name
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6 pb-4'>
                    <div className='flex h-16 shrink-0 items-center'>
                      {/* Logo */}
                      <Link to='/'>
                        <img
                          src='https://i.ibb.co.com/C9YyGkN/Logo.png'
                          className='h-10 w-auto'
                          alt='Logo'
                        />
                      </Link>
                      <p className='ml-2 font-bold text-2xl text-red-600'>
                        Media Satgasnas
                      </p>
                    </div>
                    <nav className='flex flex-1 flex-col'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map(item => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() =>
                                    handleNavigationClick(item.name)
                                  }
                                  className={classNames(
                                    item.current
                                      ? 'bg-orange-200 text-orange-600'
                                      : 'text-orange-700 hover:text-orange-600 hover:bg-orange-100',
                                    'group flex gap-x-3 p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? 'text-orange-600'
                                        : 'text-gray-400 group-hover:text-orange-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-300 bg-gray-100 px-6 pb-4'>
            <div className='flex h-16 shrink-0 items-center'>
              {/* Logo */}
              <Link to='/'>
                <img
                  src='https://i.ibb.co.com/C9YyGkN/Logo.png'
                  className='h-10 w-auto'
                  alt='Logo'
                />
              </Link>
              <p className='ml-2 font-bold text-2xl text-red-600'>
                Media Satgasnas
              </p>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map(item => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => handleNavigationClick(item.name)}
                          className={classNames(
                            item.current
                              ? 'bg-orange-200 text-orange-600'
                              : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100',
                            'group flex gap-x-3 rounded-br-full rounded-tr-full p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-orange-600'
                                : 'text-gray-400 group-hover:text-orange-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className='mt-auto'>
                  <Link
                    to='/dashboard/settings'
                    className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                  >
                    <Cog6ToothIcon
                      className='h-6 w-6 shrink-0 text-gray-400 group-hover:text-orange-600'
                      aria-hidden='true'
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='lg:pl-72'>
          <main className='py-10'>
            <div className='px-4 sm:px-6 lg:px-8'>
              {/* Your content */}

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
