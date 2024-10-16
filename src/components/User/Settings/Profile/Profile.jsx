import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  checkAuthStatusAPI,
  userProfileAPI,
} from '../../../../APIServices/users/usersAPI';
import { useEffect } from 'react';
import { isAuthenticated } from '../../../../redux/slices/authSlices';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaEdit, FaUserEdit } from 'react-icons/fa';

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
    <div className='rounded-t-lg shadow-4xl bg-white h-auto min-h-[13rem] md:min-h-[16rem]'>
      <div className='pt-4 p-4 w-full'>
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
            <div className='font-mono text-xl md:text-2xl text-gray-700'>
              <div className='flex items-center gap-4'>
                <p>{profileData?.user?.fullName || 'Fullname'}</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={4}
                  height={4}
                  viewBox='0 0 4 4'
                  fill='none'
                >
                  <circle cx={2} cy={2} r={2} fill='#B8B8B8' />
                </svg>
                <span className='text-gray-500 text-xl items-center rounded-full'>
                  {profileData?.user?.gender}
                </span>
              </div>
              <div className='flex items-center lg:mt-2 gap-4'>
                <p className='text-sm '>
                  @{profileData?.user?.username || 'Username'}
                </p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={4}
                  height={4}
                  viewBox='0 0 4 4'
                  fill='none'
                >
                  <circle cx={2} cy={2} r={2} fill='#B8B8B8' />
                </svg>
                <span className='text-gray-500 text-sm items-center rounded-full'>
                  {profileData?.user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='my-2 mt-4 mb-4 flex space-x-2 lg:space-x-4 '>
          <Link
            to='/dashboard/update-profile'
            className='flex items-center px-3 py-2 gap-1 text-xs rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            <FaEdit />
            Update Profile
          </Link>{' '}
          <Link
            to='/dashboard/upload-profile-picture'
            className='flex items-center px-3 py-2 gap-1 text-xs rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            <FaUserEdit />
            Update Photo
          </Link>{' '}
        </div>
        <div className='container mt-2 text-gray-700 max-w-3xl'>
          <p>{profileData?.user?.bio || 'My bio'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
