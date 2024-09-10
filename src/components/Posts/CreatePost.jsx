import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';

const CreatePost = () => {
  //! Post Mutation
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    //! Initial Data
    initialValues: {
      title: '',
      description: '',
    },
    //! Validation
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required!'),
      description: Yup.string().required('Description is required!'),
    }),
    //! Submit
    onSubmit: values => {
      const postData = {
        title: values.title,
        description: values.description,
      };
      postMutation.mutate(postData);
    },
  });

  //! Get Loading State
  const isLoading = postMutation.isPending;

  //! isError
  const isError = postMutation.isError;

  //! isSuccess
  const isSuccess = postMutation.isSuccess;

  //!  isError
  const error = postMutation.error;

  const errorMsg = postMutation?.error?.response?.data?.message;
  console.log(errorMsg);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post created successfully</p>}
      {isError && <p>{errorMsg}</p>}

      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Enter Title'
          {...formik.getFieldProps('title')}
        />
        {/* Display Error Message */}
        {formik.touched.title && formik.errors.title && (
          <span>{formik.errors.title}</span>
        )}
        <input
          type='text'
          name='description'
          placeholder='Enter Description'
          {...formik.getFieldProps('description')}
        />
        {/* Display Error Message */}
        {formik.touched.description && formik.errors.description && (
          <span>{formik.errors.description}</span>
        )}
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
