const ProfileSkeleton = () => {
  return (
    <div className='rounded-t-lg shadow-4xl bg-white h-auto min-h-[13rem] md:min-h-[16rem] animate-pulse'>
      <div className='pt-4 p-4 w-full'>
        <div className='flex flex-wrap'>
          <div className='relative w-16 h-16 md:w-28 md:h-28 flex-shrink-0'>
            <div className='rounded-full bg-gray-200 w-full h-full'></div>
            <div className='absolute w-4 h-4 right-0 md:right-2 bottom-1 md:bottom-2 rounded-full bg-gray-200'></div>
          </div>
          <div className='flex-grow ml-4 mt-2 md:mt-0'>
            <div className='font-mono text-xl md:text-2xl'>
              <div className='flex items-center gap-4'>
                <div className='h-6 bg-gray-200 rounded w-40'></div>
                <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
                <div className='h-6 bg-gray-200 rounded w-20'></div>
              </div>
              <div className='flex items-center lg:mt-2 gap-4'>
                <div className='h-4 bg-gray-200 rounded w-32'></div>
                <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
                <div className='h-4 bg-gray-200 rounded w-16'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='my-2 mt-4 mb-4 flex space-x-2 lg:space-x-4'>
          <div className='h-8 bg-gray-200 rounded-full w-32'></div>
          <div className='h-8 bg-gray-200 rounded-full w-32'></div>
        </div>
        <div className='container mt-2 max-w-3xl'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4 mt-2'></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
