import './Profile.css';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  checkAuthStatusAPI,
  userProfileAPI,
} from '../../../../APIServices/users/usersAPI';
import { useEffect } from 'react';
import { isAuthenticated } from '../../../../redux/slices/authSlices';
import { AiOutlineUser } from 'react-icons/ai';

const Profile = () => {
  const { data } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });

  const { data: profileData } = useQuery({
    queryKey: ['profile-data'],
    queryFn: userProfileAPI,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(isAuthenticated(data));
    }
  }, [data, dispatch]);

  return (
    <div className='Nicer rounded-md section-1 h-auto min-h-[13rem] md:min-h-[16rem]'>
      <div className='px-6 pt-14 mt-2 absolute z-10 w-full'>
        <div className='flex flex-wrap'>
          <div className='relative w-16 h-16 md:w-28 md:h-28 flex-shrink-0'>
            {data?.profilePicture ? (
              <img
                src={data?.profilePicture?.path}
                className='cat rounded-full object-cover w-full h-full border-2 border-orange-500'
                alt='Profile picture'
              />
            ) : (
              <AiOutlineUser
                className='cat rounded-full object-cover w-full h-full border-2 bg-white border-orange-500'
                alt='Default profile picture'
              />
            )}
            {profileData?.user?.isEmailVerified === true && (
              <div className='absolute w-4 h-4 right-0 md:right-2 bottom-1 md:bottom-2 rounded-full bg-green-600 text-white text-xs text-center leading-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <title>This account is verified</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                  />
                </svg>
              </div>
            )}
          </div>
          <div className='flex-grow ml-4 mt-2 md:mt-0'>
            <div className='font-mono text-xl md:text-2xl text-gray-300'>
              <p>{profileData?.user?.fullName || 'User Profile'}</p>
              <p className='text-sm'>
                {profileData?.user?.email || 'email@gmail.com'}
              </p>
              <div className='my-2 flex space-x-4'>
                {profileData?.user?.role === 'admin' ? (
                  <span className='bg-orange-600 text-gray-200 text-xs px-2 py-1 rounded-full'>
                    Admin
                  </span>
                ) : (
                  <span className='bg-red-500 text-gray-200 text-xs px-2 py-1 rounded-full'>
                    User
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-2 text-white'>
          <p>{profileData?.user?.bio || 'Your bio'}</p>
        </div>
      </div>
      <div className='TestNa mt-52 md:mt-64 rounded-b-lg h-12'></div>
    </div>
  );
};

export default Profile;
