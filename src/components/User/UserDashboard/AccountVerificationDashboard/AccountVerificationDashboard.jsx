import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { sendVerifyUserAccountAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage';

const AccountVerificationDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  //! Get the token from the url
  const { verifyToken } = useParams();

  const sendVerifyUserAccountMutation = useMutation({
    mutationKey: ['verify-account'],
    mutationFn: sendVerifyUserAccountAPI,
  });

  useEffect(() => {
    sendVerifyUserAccountMutation.mutate(verifyToken);
  }, []);

  return (
    <div>
      {sendVerifyUserAccountMutation?.isPending ? (
        <AlertMessage type='loading' message='Verification in progress...' />
      ) : sendVerifyUserAccountMutation?.isError ? (
        <AlertMessage
          type='error'
          message='Account verification failed, please try again or refresh the page!'
        />
      ) : (
        sendVerifyUserAccountMutation?.isSuccess && (
          <div
            className={`transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } flex items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-orange-500`}
          >
            <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm text-center'>
              <FaCheckCircle className='mx-auto text-orange-500 text-6xl animate-bounce' />
              <h2 className='text-2xl font-semibold text-gray-700 mt-4'>
                Account Verified
              </h2>
              <p className='mt-2 text-gray-600'>
                Your account has been successfully verified!
              </p>
              <Link to='/dashboard'>
                <button className='mt-4 w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center'>
                  <AiOutlineDashboard className='mr-2' /> Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AccountVerificationDashboard;
