import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import AlertMessage from '../../../Alert/AllertMessage';
import { sendUpdateEmailAPI } from '../../../../APIServices/users/usersAPI';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const UpdateEmail = () => {
  const navigate = useNavigate();
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  const mutation = useMutation({
    mutationKey: ['update-email'],
    mutationFn: sendUpdateEmailAPI,
  });

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      mutation.mutate(values.email);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setRedirectCountdown(3);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (redirectCountdown !== null) {
      if (redirectCountdown > 0) {
        const timer = setTimeout(() => {
          setRedirectCountdown(redirectCountdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        navigate('/dashboard');
      }
    }
  }, [redirectCountdown, navigate]);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          Add Your Email
        </h2>
        {/* Show messages */}
        {/* success */}
        {mutation.isSuccess && (
          <AlertMessage type='success' message='Email updated successfully' />
        )}
        {/* error */}
        {mutation.isError && (
          <AlertMessage type='error' message={mutation.error.message} />
        )}
        {/* isPending */}
        {mutation.isPending && (
          <AlertMessage type='loading' message='Updating email...' />
        )}
        {/* form */}
        <form onSubmit={formik.handleSubmit} className='mt-4'>
          <label htmlFor='email' className='block text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            {...formik.getFieldProps('email')}
            className='w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-sm mt-1'>
              {formik.errors.email}
            </div>
          )}
          <button
            type='submit'
            className='w-full px-3 py-2 mt-4 text-white bg-blue-600 rounded-md focus:bg-blue-700 focus:outline-none'
          >
            Add Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;
