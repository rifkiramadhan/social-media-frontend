import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import { useFormik } from 'formik';
import { forgotPasswordAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';
import { FaRegCircleUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const RequestResetPassword = () => {
  //! User Mutation
  const resetPasswordMutation = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: forgotPasswordAPI,
  });

  //! Formik Config
  const formik = useFormik({
    //! Initial Data
    initialValues: {
      username: '',
      email: '',
    },
    //! Validation
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required!'),
      email: Yup.string()
        .email('Enter valid email!')
        .required('Email is required!'),
    }),
    //! Submit
    onSubmit: values => {
      console.log(values);
      resetPasswordMutation
        .mutateAsync({ email: values.email, username: values.username })
        .then(() => {
          //! Redirect
        })
        .catch(err => {
          console.log(err);
        });
    },
  });

  console.log(resetPasswordMutation);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <div className='bg-white p-8 rounded-lg shadow-4xl w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          Reset Password
        </h2>
        {/* show alert */}
        {resetPasswordMutation.isPending && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        {resetPasswordMutation.isSuccess && (
          <AlertMessage
            type='success'
            message={resetPasswordMutation.data.message}
          />
        )}
        {resetPasswordMutation.isError && (
          <AlertMessage
            type='error'
            message={resetPasswordMutation.error.response.data.message}
          />
        )}

        <form className='mt-4' onSubmit={formik.handleSubmit}>
          <label htmlFor='username' className='block text-gray-700'>
            Username:
          </label>
          <div className='flex items-center border rounded-md focus:outline-none focus:ring focus:border-orange-300'>
            <FaRegCircleUser className='mx-2 text-orange-500' />
            <input
              type='username'
              id='username'
              {...formik.getFieldProps('username')}
              className='w-full px-3 py-2 mt-2 border-0 rounded-md'
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-sm mt-1'>
              {formik.errors.username}
            </div>
          )}
          <label htmlFor='email' className='block text-gray-700'>
            Email:
          </label>
          <div className='flex items-center border rounded-md focus:outline-none focus:ring focus:border-orange-300'>
            <AiOutlineMail className='mx-2 text-orange-500' />
            <input
              type='email'
              id='email'
              {...formik.getFieldProps('email')}
              className='w-full px-3 py-2 mt-2 border-0 rounded-md'
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-sm mt-1'>
              {formik.errors.email}
            </div>
          )}
          <button
            type='submit'
            className='flex gap-1 justify-center items-center w-full px-3 py-2 mt-4 text-white bg-orange-600 rounded-md focus:bg-orange-700 focus:outline-none'
          >
            <MdEmail />
            Send Reset Password Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
