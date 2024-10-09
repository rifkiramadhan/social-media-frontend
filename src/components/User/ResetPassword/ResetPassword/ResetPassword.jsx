import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';

const ResetPassword = () => {
  //! Get the token from the url
  const { verifyToken } = useParams();
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  //! User mutation
  const resetPasswordMutation = useMutation({
    mutationKey: ['user-registration'],
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      let count = 3;
      setRedirectCountdown(count);

      const countdownInterval = setInterval(() => {
        count -= 1;
        setRedirectCountdown(count);
        if (count === 0) {
          clearInterval(countdownInterval);
          window.location.href = '/login';
        }
      }, 500);
    },
  });

  //! Formik config
  const formik = useFormik({
    //! Initial data
    initialValues: {
      password: '',
    },
    //! Validation
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
    }),
    //! Submit
    onSubmit: values => {
      const data = {
        password: values.password,
        verifyToken,
      };
      resetPasswordMutation
        .mutateAsync(data)
        .then(() => {
          //! redirect
        })
        .catch(err => console.log(err));
    },
  });
  console.log(resetPasswordMutation);
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          Enter New Password
        </h2>
        {resetPasswordMutation.isPending && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        {resetPasswordMutation.isSuccess && (
          <AlertMessage
            type='success'
            message={`${resetPasswordMutation.data?.message}. Redirecting in ${redirectCountdown} seconds...`}
          />
        )}
        {resetPasswordMutation.isError && (
          <AlertMessage
            type='error'
            message={resetPasswordMutation.error.response.data.message}
          />
        )}
        <form className='mt-4' onSubmit={formik.handleSubmit}>
          <label htmlFor='password' className='block text-gray-700'>
            password:
          </label>
          <div className='flex items-center border rounded-md focus:outline-none focus:ring focus:border-orange-300'>
            <RiLockPasswordLine className='mx-2 text-orange-500' />
            <input
              type='password'
              id='password'
              {...formik.getFieldProps('password')}
              className='w-full px-3 py-2 mt-2 border-0 rounded-md'
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className='text-red-500 text-sm mt-1'>
              {formik.errors.password}
            </div>
          )}
          <button
            type='submit'
            className='flex justify-center gap-1 items-center w-full px-3 py-2 mt-4 text-white bg-orange-600 rounded-md focus:bg-orange-700 focus:outline-none'
          >
            <RiLockPasswordLine />
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
