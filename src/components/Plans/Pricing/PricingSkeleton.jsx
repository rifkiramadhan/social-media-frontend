const PricingSkeleton = () => {
  return (
    <section className='py-24 bg-gray-100 animate-pulse'>
      <div className='mx-auto px-4 sm:px-8 lg:px-8'>
        <div className='h-12 bg-gray-200 rounded w-3/4 mx-auto mb-6'></div>
        <div className='h-4 bg-gray-200 rounded max-w-lg mx-auto mb-10'></div>

        <div className='flex flex-wrap mb-24 -mx-4'>
          {/* Free Plan Skeleton */}
          <div className='w-full lg:w-1/2 p-4'>
            <div className='bg-white border border-gray-200 rounded-3xl px-8 lg:px-10 pb-14 pt-10 h-full'>
              <div className='h-8 bg-gray-200 rounded w-1/3 mb-6'></div>
              <div className='h-12 bg-gray-200 rounded w-1/2 mb-6'></div>
              <div className='h-14 bg-gray-200 rounded mb-10'></div>
              <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
              <ul className='flex flex-col gap-4'>
                {[...Array(5)].map((_, index) => (
                  <li key={index} className='flex gap-4'>
                    <div className='w-6 h-6 bg-gray-200 rounded-full'></div>
                    <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Premium Plan Skeleton */}
          <div className='w-full lg:w-1/2 p-4'>
            <div className='bg-orange-200 rounded-3xl px-8 lg:px-10 pb-14 pt-10 h-full'>
              <div className='h-8 bg-orange-200 rounded w-1/3 mb-6'></div>
              <div className='h-12 bg-orange-200 rounded w-1/2 mb-6'></div>
              <div className='h-14 bg-white rounded mb-8'></div>
              <div className='h-6 bg-orange-200 rounded w-1/4 mb-4'></div>
              <ul className='flex flex-col gap-4'>
                {[...Array(5)].map((_, index) => (
                  <li key={index} className='flex gap-4'>
                    <div className='w-6 h-6 bg-orange-200 rounded-full'></div>
                    <div className='h-6 bg-orange-200 rounded w-3/4'></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='h-10 bg-gray-200 rounded w-1/2 mx-auto mb-20'></div>

        <div className='flex flex-wrap -mx-4'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='w-full lg:w-1/2 px-4'>
              <div className='py-12 border-b border-gray-100 h-full'>
                <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSkeleton;
