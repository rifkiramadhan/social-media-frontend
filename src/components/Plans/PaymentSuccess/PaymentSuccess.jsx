import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { paymentVerificationAPI } from '../../../APIServices/stripe/stripeAPI';

const PaymentSuccess = () => {
  //get the query data for payment id
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  const { isError, isLoading, error } = useQuery({
    queryKey: ['verify-payment'],
    queryFn: () => paymentVerificationAPI(paymentIntentId),
  });

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-4xl max-w-md w-full'>
        {isLoading ? (
          <div className='flex flex-col items-center space-y-4'>
            <FaSpinner className='animate-spin text-4xl text-orange-500' />
            <p className='text-lg text-gray-600'>
              Verifying your payment, please wait...
            </p>
          </div>
        ) : isError ? (
          <div className='flex flex-col items-center space-y-4'>
            <FaTimesCircle className='text-5xl text-red-500' />
            <p className='text-xl'>Payment verification failed</p>
            <p className='text-red-500'>{error.message}</p>
          </div>
        ) : (
          <div className='flex flex-col items-center space-y-4'>
            <FaCheckCircle className='text-5xl text-green-500' />
            <h1 className='text-2xl font-bold'>Payment Successful</h1>
            <p className='text-gray-600'>
              Thank you for your payment. Your transaction ID is{' '}
              <p className='text-center font-bold'>{paymentIntentId}</p>
            </p>
            <Link
              to='/dashboard/create-post'
              className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none'
            >
              <HiOutlineClipboardCheck /> Start Creating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
