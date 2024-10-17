const MyFollowingSkeleton = () => {
  return (
    <section className='relative py-20 md:py-32 overflow-hidden bg-gray-100'>
      <div className='relative container px-4 mx-auto'>
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl mx-auto mb-20 text-center'>
            <div className='h-12 bg-gray-300 rounded w-3/4 mx-auto mb-8'></div>
            <div className='h-4 bg-gray-300 rounded w-full mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 rounded w-2/3 mx-auto'></div>
          </div>

          <div className='flex flex-wrap -mx-4 -mb-8'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className='w-full md:w-1/2 lg:w-1/3 px-4 mb-8'>
                <div className='max-w-md mx-auto py-10 px-6 text-center bg-white rounded-lg shadow-4xl'>
                  <div className='w-24 h-24 rounded-full bg-gray-300 mb-6 mx-auto'></div>
                  <div className='h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2'></div>
                  <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto mb-3'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFollowingSkeleton;
