import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { FaTimesCircle } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { uploadProfilePictureAPI } from '../../../../APIServices/users/usersAPI';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';

const UploadProfilePicture = () => {
  //! State for wysiwg
  //! File upload state
  const [imageError, setImageErr] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  //! Post mutation
  const mutation = useMutation({
    mutationKey: ['upload-profile-picture'],
    mutationFn: uploadProfilePictureAPI,
    onSuccess: () => {
      let count = 3;
      setRedirectCountdown(count);

      const countdownInterval = setInterval(() => {
        count -= 1;
        setRedirectCountdown(count);
        if (count === 0) {
          clearInterval(countdownInterval);
          window.location.href = '/dashboard/posts';
        }
      }, 500);
    },
  });

  const formik = useFormik({
    //! Initial data
    initialValues: {
      image: '',
    },

    //! Validation
    validationSchema: Yup.object({
      image: Yup.string().required('image is required'),
    }),

    //! Submit
    onSubmit: values => {
      const formData = new FormData();
      formData.append('image', values.image);

      mutation.mutate(formData);
    },
  });

  console.log(mutation);
  //! ----File upload logics ----
  //! Handle fileChange
  const handleFileChange = event => {
    //get the file selected
    const file = event.currentTarget.files[0];
    //Limit file size
    if (file.size > 1048576) {
      setImageErr('File size exceed 1MB');
      return;
    }
    // limit the file types
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImageErr('Invalid file type');
    }
    //set the image preview
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  //! Remove image
  const removeImage = () => {
    formik.setFieldValue('image', null);
    setImagePreview(null);
  };

  //! Get loading state
  const isLoading = mutation.isPending;
  //! isErr
  const isError = mutation.isError;
  //! Success
  const isSuccess = mutation.isSuccess;
  //! Error
  const errorMsg = mutation?.error?.response?.data?.message;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-4xl p-8 m-4'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>
          Upload Profile Picture
        </h2>
        {/* show alert */}

        {isLoading && (
          <AlertMessage type='loading' message='Loading please wait' />
        )}
        {isSuccess && (
          <AlertMessage
            type='success'
            message={`Profile image has been updated successfully. Redirecting in ${redirectCountdown} seconds...`}
          />
        )}
        {isError && <AlertMessage type='error' message={errorMsg} />}
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          {/* Image Upload Input - File input for uploading images */}
          <div className='flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg'>
            <label
              htmlFor='images'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Upload Image
            </label>
            <div className='flex justify-center items-center w-full'>
              <input
                id='images'
                type='file'
                name='image'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />
              <label
                htmlFor='images'
                className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'
              >
                Choose a file
              </label>
            </div>
            {/* Display error message */}
            {formik.touched.image && formik.errors.image && (
              <p className='text-sm text-red-600'>{formik.errors.image}</p>
            )}

            {/* error message */}
            {imageError && <p className='text-sm text-red-600'>{imageError}</p>}

            {/* Preview image */}

            {imagePreview && (
              <div className='mt-2 relative'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='mt-2 h-24 w-24 object-cover rounded-full'
                />
                <button
                  onClick={removeImage}
                  className='absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1'
                >
                  <FaTimesCircle className='text-red-500' />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type='submit'
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
