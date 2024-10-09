import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logoutAPI, userProfileAPI } from '../../APIServices/users/usersAPI';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlices';
import NotificationCounts from '../Notification/NotificationCounts/NotificationCounts';
import Avatar from '../User/Avatar/Avatar';
import { AiOutlineUser } from 'react-icons/ai';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const PrivateNavbar = () => {
  //! Dispatch hook
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: userProfileAPI,
  });

  console.log(data);

  //! User Mutation
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutAPI,
  });

  //! Logout Handler
  const logoutHandler = async () => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        //! Dispatch action to logout
        dispatch(logout(null));
        localStorage.removeItem('token');
        // navigate('/posts');
        window.location.href = '/posts';
      })
      .catch(e => console.log(e));
  };

  const navItems = [
    { name: 'Latest Articles', path: '/posts' },
    { name: 'Creators Ranking', path: '/ranking' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const dashboardItems = [
    { name: 'Create New Post', path: '/dashboard/create-post' },
    { name: 'My Posts', path: '/dashboard/posts' },
    { name: 'My Followers', path: '/dashboard/my-followers' },
    { name: 'My Followings', path: '/dashboard/my-followings' },
    { name: 'Add New Category', path: '/dashboard/add-category' },
    { name: 'Create New Plan', path: '/dashboard/create-plan' },
    { name: 'My Earnings', path: '/dashboard/my-earnings' },
    { name: 'Users', path: '/dashboard/users' },
  ];

  return (
    <Disclosure as='nav' className='bg-gray-100 drop-shadow-sm'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-8 lg:px-6'>
            <div className='flex h-16 justify-start items-center'>
              <div className='flex-row w-full'>
                <div className='flex justify-start items-start flex-row'>
                  <div className='-ml-2 mr-2 flex items-left md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'>
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='hidden md:ml-6 md:flex md:space-x-8'>
                    {navItems.map(item => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          activeItem === item.path
                            ? 'border-orange-500  text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-orange-200 hover:text-gray-700'
                        }`}
                        onClick={() => setActiveItem(item.path)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex-shrink-0'>
                  <Link to='/dashboard'>
                    <button
                      type='button'
                      className='relative mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                    >
                      <MdOutlineDashboard />
                      Dashboard
                    </button>
                  </Link>
                  {/* Notification */}
                </div>
                <NotificationCounts />
                <div className='hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative'>
                    <div>
                      <Menu.Button className='relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>Open user menu</span>
                        {/* Profile Image */}
                        {data?.user?.profilePicture?.path ? (
                          <img
                            className='h-10 w-10 object-contain rounded-full'
                            src={data?.user?.profilePicture?.path}
                            alt='profile'
                          />
                        ) : (
                          <AiOutlineUser className='w-10 h-10 object-contain rounded-full' />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/dashboard/settings'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              {navItems.map(item => (
                <Link key={item.name} to={item.path}>
                  <Disclosure.Button
                    as='button'
                    className={`block w-full text-left border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      activeItem === item.path
                        ? 'border-orange-500 bg-orange-100 text-orange-700'
                        : 'border-transparent text-gray-500 hover:border-orange-300 hover:bg-orange-200 hover:text-gray-700'
                    } sm:pl-5 sm:pr-6`}
                    onClick={() => setActiveItem(item.path)}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <div className='border-t border-gray-200 pb-3 pt-4'>
              {dashboardItems.map(item => (
                <Link key={item.name} to={item.path}>
                  <Disclosure.Button
                    as='button'
                    className={`block w-full text-left border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      activeItem === item.path
                        ? 'border-orange-500 bg-orange-100 text-orange-700'
                        : 'border-transparent text-gray-500 hover:border-orange-300 hover:bg-orange-200 hover:text-gray-700'
                    } sm:pl-5 sm:pr-6`}
                    onClick={() => setActiveItem(item.path)}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            {/* Profile links */}
            <div className='border-t border-gray-200 pb-3 pt-4'>
              <div className='flex items-center px-4 sm:px-6'>
                <div className='flex-shrink-0'>
                  {/* Profile Image */}
                  {data?.user?.profilePicture?.path ? (
                    <img
                      className='h-10 object-contain w-10 rounded-full'
                      src={data?.user?.profilePicture?.path}
                      alt='profile'
                    />
                  ) : (
                    <Avatar />
                  )}
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    {localStorage.getItem('username')}
                  </div>
                  <div className='text-sm font-medium text-gray-500'>
                    {data?.user?.username}
                  </div>
                </div>
              </div>
              <div className='mt-3 space-y-1'>
                <Link to='/dashboard/settings'>
                  <Disclosure.Button
                    as='button'
                    className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6'
                  >
                    Settings
                  </Disclosure.Button>
                </Link>
                <Disclosure.Button
                  as='button'
                  onClick={logoutHandler}
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6'
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PrivateNavbar;
