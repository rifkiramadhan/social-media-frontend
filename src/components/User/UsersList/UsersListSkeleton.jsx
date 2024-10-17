const UsersListSkeleton = () => {
  return (
    <div className='container mx-auto animate-pulse'>
      <div className='h-8 bg-gray-200 w-48 mb-4 rounded'></div>
      <div className='space-y-3'>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className='flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-4xl'
          >
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
              <div className='space-y-2'>
                <div className='h-4 bg-gray-200 w-32 rounded'></div>
                <div className='h-3 bg-gray-200 w-24 rounded'></div>
              </div>
            </div>
            <div className='w-20 h-8 bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersListSkeleton;
