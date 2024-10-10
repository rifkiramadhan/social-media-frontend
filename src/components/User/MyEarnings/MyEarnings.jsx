import { useQuery } from '@tanstack/react-query';
import { FaDollarSign } from 'react-icons/fa';
import { getMyEarningsAPI } from '../../../APIServices/earnings/earningsAPI';
import NoDataFound from '../../Alert/NoDataFound/NoDataFound';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';

const MyEarnings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-earnings'],
    queryFn: getMyEarningsAPI,
  });

  return (
    <div>
      {isError && <AlertMessage type='error' message='Something happened!' />}
      {isLoading ? (
        <AlertMessage type='loading' message='Loading please wait...' />
      ) : (
        <div className='flex justify-center items-center bg-gray-100'>
          <div className='max-w-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 bg-white rounded-lg shadow-4xl overflow-hidden '>
            <div className='flex flex-col items-center py-6 bg-gradient-to-r from-green-400 to-orange-500 '>
              <FaDollarSign className='text-white text-6xl' />
              <h1 className='text-2xl font-bold text-white mt-3'>
                My Earnings
              </h1>
            </div>
            <ul className='divide-y divide-gray-200'>
              {data?.map(earning => (
                <li
                  key={earning._id}
                  className='p-4 flex justify-between items-center hover:bg-gray-50'
                >
                  <span className='font-medium text-gray-800'>
                    {earning?.user?.username}
                  </span>
                  <div className='text-right'>
                    <span className='text-lg text-gray-800'>
                      {earning.amount}
                    </span>
                    <span className='block text-sm text-gray-500'>
                      {new Date(earning.calculatedOn).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEarnings;
