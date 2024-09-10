import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPost, updatePostAPI } from '../../../APIServices/posts/postsAPI';

const UpdatePost = () => {
  //! Get the post id
  const { postId } = useParams();

  //! User Query
  const { data } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => fetchPost(postId),
  });

  //! Post Mutation
  const postMutation = useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePostAPI,
  });
  console.log(data);

  const formik = useFormik({
    //! Initial Data
    initialValues: {
      title: data?.postFound?.title || '',
      description: data?.postFound?.description || '',
    },
    enableReinitialize: true,
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
        postId,
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

  //! isError
  const error = postMutation.error;

  return (
    <div>
      <h1>You are editing - {data?.postFound.title}</h1>

      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post updated successfully</p>}
        {isError && <p>{error.message}</p>}

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
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
