const AccountSummaryDashboardSkeleton = () => {
  return (
    <div className='container animate-pulse'>
      <div className='h-8 bg-gray-300 w-64 mb-4 rounded'></div>

      {/* Alert placeholders */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className='h-20 bg-gray-200 mb-4 rounded'></div>
      ))}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[...Array(8)].map((_, index) => (
          <div key={index} className='bg-gray-300 rounded-lg shadow-lg p-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-8 h-8 bg-gray-400 rounded-full'></div>
              <div>
                <div className='h-6 bg-gray-400 w-16 mb-2 rounded'></div>
                <div className='h-4 bg-gray-400 w-20 rounded'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummaryDashboardSkeleton;
