import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className='rounded-t-lg shadow-4xl bg-white h-auto min-h-[13rem] md:min-h-[16rem] animate-pulse p-4'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center'>
        <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex-shrink-0'>
          <div className='rounded-full bg-gray-200 w-full h-full'></div>
          <div className='absolute w-4 h-4 right-0 bottom-0 rounded-full bg-gray-300'></div>
        </div>
        <div className='flex-grow mt-4 sm:mt-0 sm:ml-4'>
          <div className='space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <div className='h-6 bg-gray-200 rounded w-32 sm:w-40'></div>
              <div className='h-4 w-4 bg-gray-200 rounded-full hidden sm:block'></div>
              <div className='h-6 bg-gray-200 rounded w-20'></div>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <div className='h-4 bg-gray-200 rounded w-24 sm:w-32'></div>
              <div className='h-4 w-4 bg-gray-200 rounded-full hidden sm:block'></div>
              <div className='h-4 bg-gray-200 rounded w-16'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-6 flex flex-wrap gap-3'>
        <div className='h-8 bg-gray-200 rounded-full w-32 sm:w-36'></div>
        <div className='h-8 bg-gray-200 rounded-full w-32 sm:w-36'></div>
      </div>
      <div className='mt-4 space-y-2'>
        <div className='h-4 bg-gray-200 rounded w-full'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
