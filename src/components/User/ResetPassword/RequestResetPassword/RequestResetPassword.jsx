import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { forgotPasswordAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';

const RequestResetPassword = () => {
  //! Navigate
  // const navigate = useNavigate();

  //! User Mutation
  const resetPasswordMutation = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: forgotPasswordAPI,
  });

  //! Formik Config
  const formik = useFormik({
    //! Initial Data
    initialValues: {
      email: '',
    },
    //! Validation
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter valid email!')
        .required('Email is required!'),
    }),
    //! Submit
    onSubmit: values => {
      console.log(values);
      resetPasswordMutation
        .mutateAsync(values.email)
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
    <div className='flex items-center justify-center h-screen bg-orange-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          Reset Your Password
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
            className='w-full px-3 py-2 mt-4 text-white bg-orange-600 rounded-md focus:bg-orange-700 focus:outline-none'
          >
            Send Reset Password Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
