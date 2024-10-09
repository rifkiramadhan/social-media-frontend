import { useQuery } from '@tanstack/react-query';
import { FaGift } from 'react-icons/fa';
import { freePlanAPI } from '../../../../APIServices/stripe/stripeAPI';
import { Link } from 'react-router-dom';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';

const PayingFreePlan = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['free-plan'],
    queryFn: freePlanAPI,
  });
  console.log(data);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      {/* show loading */}
      {isLoading && (
        <AlertMessage type='loading' message='Processing from plan...' />
      )}
      {isError && (
        <AlertMessage
          type='error'
          message='Something went wrong, try again later!'
        />
      )}
      {isSuccess && (
        <div className='w-full max-w-md bg-white rounded-lg shadow-4xl p-6'>
          <FaGift className='w-16 h-16 mx-auto text-green-900' />

          <h2 className='mt-6 text-2xl font-semibold text-center text-green-900'>
            Free Plan Activation
          </h2>

          <p className='mt-2 text-center text-gray-500'>
            Proceed to activate your free plan.
          </p>
          <Link to='/dashboard/create-post'>
            <button className='mt-8 w-full py-2 px-4 bg-green-900 text-white rounded hover:bg-green-600 hover:text-green-900 focus:outline-none'>
              Start Creating
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PayingFreePlan;
