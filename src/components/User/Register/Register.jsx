import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerAPI } from '../../../APIServices/users/usersAPI';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';
import { BASE_URL_API } from '../../../utils/baseEndpointURL';
import { UsersVersion } from '../../../utils/baseEndpointVersion/usersVersion/usersVersion';
import { UsersGrouping } from '../../../utils/baseEndpointGrouping/usersGrouping/usersGrouping';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  //! Navigate
  const navigate = useNavigate();

  //! User Mutation
  const userMutation = useMutation({
    mutationKey: ['user-registration'],
    mutationFn: registerAPI,
  });

  //! Formik Config
  const formik = useFormik({
    //! Initial Data
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    //! Validation
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required!'),
      email: Yup.string()
        .email('Enter valid email!')
        .required('Email is required!'),
      password: Yup.string().required('Password is required!'),
    }),
    //! Submit
    onSubmit: values => {
      console.log(values);
      userMutation
        .mutateAsync(values)
        .then(() => {
          //! Redirect
          navigate('/login');
        })
        .catch(err => {
          console.log(err);
        });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(userMutation);

  return (
    <div className='flex flex-wrap pb-24 bg-gray-100'>
      <div className='w-full p-4'>
        <div className='flex flex-col justify-center py-24 max-w-md mx-auto h-full'>
          <form
            className='bg-white rounded-2xl border-4xl p-8'
            onSubmit={formik.handleSubmit}
          >
            <Link
              to='/login'
              className='inline-block text-gray-500 hover: transition duration-200 mb-8'
            >
              <span>Already have an account ? </span>
              <span className='font-bold font-heading'>Sign In</span>
            </Link>
            {/* show alert */}
            {userMutation.isPending && (
              <AlertMessage type='loading' message='Loading please wait...' />
            )}
            {userMutation.isSuccess && (
              <AlertMessage
                type='success'
                message='Registration successfully'
              />
            )}
            {userMutation.isError && (
              <AlertMessage
                type='error'
                message={userMutation.error.response.data.message}
              />
            )}
            <label
              className='block text-sm font-medium mb-2'
              htmlFor='textInput1'
            >
              Username:
            </label>
            <input
              className='w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4'
              type='text'
              placeholder='Enter username'
              {...formik.getFieldProps('username')}
            />
            {/* error */}
            {formik.touched.username && formik.errors.username && (
              <div className='text-red-500 mt-1'>{formik.errors.username}</div>
            )}
            <label
              className='block text-sm font-medium mb-2'
              htmlFor='textInput1'
            >
              Email:
            </label>
            <input
              className='w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4'
              type='text'
              placeholder='Enter email'
              {...formik.getFieldProps('email')}
            />
            {/* error */}
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-500 mt-1'>{formik.errors.email}</div>
            )}
            <label
              className='block text-sm font-medium mb-2'
              htmlFor='textInput2'
            >
              Password:
            </label>
            <div className='flex items-center gap-1 w-full rounded-full p-4 border border-gray-100 shadow mb-8'>
              <input
                className='outline-none flex-1 placeholder-gray-500 '
                id='textInput2'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                {...formik.getFieldProps('password')}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='focus:outline-none'
              >
                {showPassword ? (
                  <FaEyeSlash className='h-5 w-5 text-gray-500' />
                ) : (
                  <FaEye className='h-5 w-5 text-gray-500' />
                )}
              </button>
            </div>
            {/* error */}
            {formik.touched.password && formik.errors.password && (
              <div className='text-red-500 mt-1'>{formik.errors.password}</div>
            )}
            <button
              className='h-14 inline-flex items-center justify-center gap-2 py-4 px-6 text-white font-bold font-heading rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8'
              type='submit'
            >
              <RiLoginCircleFill className='h-5 w-5' aria-hidden='true' />
              Sign Up
            </button>
            {/* login with google */}
            <a
              href={`${BASE_URL_API}/${UsersVersion}/${UsersGrouping}/auth/google`}
              className='h-14 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-white w-full text-center border border-gray-100 shadow hover:bg-gray-50 focus:ring focus:ring-orange-200 transition duration-200'
              type='submit'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={21}
                height={20}
                viewBox='0 0 21 20'
                fill='none'
              >
                <path
                  d='M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41699 14.464 2.41699 10C2.41699 5.53599 6.03631 1.91667 10.5003 1.91667Z'
                  fill='#FFC107'
                  stroke='#FFC107'
                  strokeWidth='0.5'
                />
                <path
                  d='M3.12793 6.12125L5.86585 8.12917C6.60668 6.29501 8.40085 5.00001 10.5004 5.00001C11.775 5.00001 12.9346 5.48084 13.8175 6.26625L16.1746 3.90917C14.6863 2.52209 12.6954 1.66667 10.5004 1.66667C7.2996 1.66667 4.52376 3.47375 3.12793 6.12125Z'
                  fill='#FF3D00'
                />
                <path
                  d='M10.4998 18.3333C12.6523 18.3333 14.6081 17.5096 16.0869 16.17L13.5077 13.9875C12.6429 14.6452 11.5862 15.0009 10.4998 15C8.3323 15 6.49189 13.6179 5.79855 11.6892L3.08105 13.7829C4.46022 16.4817 7.26105 18.3333 10.4998 18.3333Z'
                  fill='#4CAF50'
                />
                <path
                  d='M18.6713 8.36791H18V8.33333H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.9879L13.5079 13.9871L16.0871 16.1696C15.9046 16.3354 18.8333 14.1667 18.8333 9.99999C18.8333 9.44124 18.7758 8.89583 18.6713 8.36791Z'
                  fill='#1976D2'
                />
              </svg>
              <span className='font-bold font-heading'>
                Sign in with Google
              </span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
