const MyEarningsSkeleton = () => {
  return (
    <div className='flex justify-center items-center bg-gray-100 min-h-screen'>
      <div className='max-w-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 bg-white rounded-lg shadow-4xl overflow-hidden animate-pulse'>
        <div className='flex flex-col items-center py-6 bg-gradient-to-r from-green-400 to-orange-500'>
          <div className='w-16 h-16 rounded-full bg-white opacity-50 mb-3'></div>
          <div className='h-8 bg-white opacity-50 w-1/2 rounded'></div>
        </div>
        <ul className='divide-y divide-gray-200'>
          {[...Array(5)].map((_, index) => (
            <li key={index} className='p-4 flex justify-between items-center'>
              <div className='h-5 bg-gray-300 rounded w-1/3'></div>
              <div className='text-right'>
                <div className='h-6 bg-gray-300 rounded w-24 mb-1'></div>
                <div className='h-4 bg-gray-300 rounded w-20'></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyEarningsSkeleton;
