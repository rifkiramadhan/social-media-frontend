import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateUserProfileAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';

const UpdateProfile = () => {
  const navigate = useNavigate();

  //! Post Mutation
  const updateProfileMutation = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: updateUserProfileAPI,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/dashboard/posts');
      }, 1000);
    },
  });

  const formik = useFormik({
    //! Initial Data
    enableReinitialize: true,
    initialValues: {
      fullName: '',
      age: '',
      phoneNumber: '',
      bio: '',
      gender: '',
      nik: '',
    },
    //! Validation
    validationSchema: Yup.object({
      fullName: Yup.string().required('Fullname is required!'),
      age: Yup.string().required('Age is required!'),
      phoneNumber: Yup.string().required('Phone Number is required!'),
      bio: Yup.string().required('Bio is required!'),
      gender: Yup.string().required('Gender is required!'),
      nik: Yup.string().required('NIK is required!'),
    }),
    //! Submit
    onSubmit: values => {
      updateProfileMutation.mutate(values);
    },
  });

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={formik.handleSubmit}
        className='max-w-md w-full p-6 mt-8 bg-white rounded-lg shadow-4xl'
      >
        <h2 className='mb-4 text-xl font-semibold text-center text-gray-700'>
          Update Profile
        </h2>
        {/* show mesage */}
        {updateProfileMutation.isPending && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        {updateProfileMutation.isSuccess && (
          <AlertMessage type='success' message='Profile updated successfully' />
        )}
        {updateProfileMutation.isError && (
          <AlertMessage
            type='error'
            message={updateProfileMutation?.error?.response?.data?.message}
          />
        )}

        {/* Type Name Input */}
        <div className='mb-4'>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700'>
              Full Name:
            </label>
            <input
              type='text'
              id='fullName'
              maxLength='12'
              {...formik.getFieldProps('fullName')}
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className='text-red-500 mt-1'>{formik.errors.fullName}</div>
            )}
          </div>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Gender:
          </label>
          <select
            id='gender'
            {...formik.getFieldProps('gender')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {formik.touched.planName && formik.errors.planName && (
            <div className='text-red-500 mt-1'>{formik.errors.planName}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Age:
          </label>
          <input
            type='number'
            id='age'
            onInput={e => {
              if (e.target.value.length > 2) {
                e.target.value = e.target.value.slice(0, 2);
              }
            }}
            {...formik.getFieldProps('age')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.age && formik.errors.age && (
            <div className='text-red-500 mt-1'>{formik.errors.age}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Phone Number:
          </label>
          <input
            type='number'
            id='phoneNumber'
            onInput={e => {
              if (e.target.value.length >= 15) {
                e.target.value = e.target.value.slice(0, 15);
              }
            }}
            {...formik.getFieldProps('phoneNumber')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className='text-red-500 mt-1'>{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            NIK:
          </label>
          <input
            type='number'
            id='nik'
            onInput={e => {
              if (e.target.value.length >= 16) {
                e.target.value = e.target.value.slice(0, 16);
              }
            }}
            {...formik.getFieldProps('nik')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.nik && formik.errors.nik && (
            <div className='text-red-500 mt-1'>{formik.errors.nik}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Bio:
          </label>
          <textarea
            type='text'
            id='bio'
            maxLength='300'
            {...formik.getFieldProps('bio')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className='text-red-500 mt-1'>{formik.errors.bio}</div>
          )}
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
