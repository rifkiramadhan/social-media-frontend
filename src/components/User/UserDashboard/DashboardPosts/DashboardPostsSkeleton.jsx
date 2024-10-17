const DashboardPostsSkeleton = () => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {[...Array(6)].map((_, index) => (
              <th key={index} scope='col' className='px-6 py-3 text-left'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full'></div>
                  <div className='ml-4 w-3/4'>
                    <div className='h-4 bg-gray-200 rounded'></div>
                  </div>
                </div>
              </td>
              {[...Array(4)].map((_, cellIndex) => (
                <td key={cellIndex} className='px-6 py-4 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                </td>
              ))}
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex space-x-2'>
                  <div className='h-8 bg-gray-200 rounded w-16'></div>
                  <div className='h-8 bg-gray-200 rounded w-16'></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPostsSkeleton;
