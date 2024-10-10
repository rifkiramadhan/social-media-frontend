import { FaSpinner } from 'react-icons/fa';

const AuthChecking = () => {
  return (
    <div className='flex flex-col items-center justify-center h-96 bg-gray-100'>
      <FaSpinner className='animate-spin text-4xl text-orange-500' />
      <p className='mt-4 text-lg text-gray-900'>
        Checking authentication status, please wait...
      </p>
    </div>
  );
};

export default AuthChecking;
