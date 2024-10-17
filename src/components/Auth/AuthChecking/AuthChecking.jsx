import { FaSpinner } from 'react-icons/fa';

const AuthChecking = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <FaSpinner className='animate-spin text-4xl text-orange-500' />
      <p className='mt-4 text-lg font-medium text-gray-900'>Loading...</p>
    </div>
  );
};

export default AuthChecking;
