import { FaTrophy } from 'react-icons/fa';

const RankingsSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12'>
      <div className='w-full sm:max-w-xl mx-auto min-h-screen'>
        <div className='flex flex-col justify-between items-center h-full bg-white border-gray-100 rounded-lg shadow-4xl overflow-hidden'>
          <div className='px-4 py-10 sm:p-10'>
            <div className='max-w-md mx-auto'>
              {/* Header Section */}
              <div className='flex items-center space-x-5 mb-6'>
                <FaTrophy className='text-gray-300 text-5xl animate-pulse' />
                <div className='block pl-2 font-semibold text-2xl self-start text-gray-700'>
                  <div className='h-7 bg-gray-200 rounded w-40 mb-2 animate-pulse'></div>
                  <div className='h-4 bg-gray-200 rounded w-56 animate-pulse'></div>
                </div>
              </div>

              {/* Skeleton Loading Items */}
              <div className='divide-y divide-gray-200'>
                {[1, 2, 3, 4, 5].map(item => (
                  <div
                    key={item}
                    className='pt-6 pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'
                  >
                    <div className='flex items-center space-x-4'>
                      {/* Rank Number */}
                      <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse' />

                      {/* Avatar */}
                      <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse' />

                      {/* Username */}
                      <div className='w-24 h-6 bg-gray-200 rounded animate-pulse' />

                      {/* Posts count */}
                      <div className='w-20 h-6 bg-gray-200 rounded animate-pulse' />

                      {/* Amount */}
                      <div className='ml-auto flex items-center space-x-2'>
                        <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse' />
                        <div className='w-16 h-6 bg-gray-200 rounded animate-pulse' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingsSkeleton;
