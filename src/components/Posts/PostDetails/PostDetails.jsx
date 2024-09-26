import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaComment,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  deletePostAPI,
  dislikePostAPI,
  fetchPost,
  likePostAPI,
} from '../../../APIServices/posts/postsAPI';
import { RiUserUnfollowFill, RiUserFollowLine } from 'react-icons/ri';
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from '../../../APIServices/users/usersAPI';
import { useFormik } from 'formik';
import { createCommentAPI } from '../../../APIServices/comments/commentsAPI';
import AlertMessage from '../../Alert/AllertMessage';

const PostDetails = () => {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  //! Get the post id
  const { postId } = useParams();

  //! Use query
  const {
    isError,
    isLoading,
    isSuccess,
    data,
    error,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => fetchPost(postId),
  });

  //! Profile Use Query
  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userProfileAPI(),
  });

  const handleClick = () => {
    // Ambil pathname dari useLocation
    const pathname = location.pathname;

    // Memisahkan URL menjadi array berdasarkan '/'
    const parts = pathname.split('/');

    // Potong URL untuk mengambil 'dashboard/update-post/idpostingan'
    const newPath = `dashboard/update-post/${postId}`;

    // Redirect atau navigate ke path baru
    navigate(`/${newPath}`);
  };

  //! Post Mutation
  const postMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePostAPI,
  });

  //! Delete Handler
  const deleteHandler = async postId => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        navigate('/posts');
        //! refetch
        refetch();
      })
      .catch(e => console.log(e));
  };

  //! Follow Logic
  //! Get the author id
  const targetId = data?.postFound?.author;

  //! Get the login userid
  const userId = profileData?.user?._id;

  //! Get if the user/login is following the user
  const isFollowing = profileData?.user?.following?.find(
    user => user?._id?.toString() === targetId?.toString()
  );

  //! Follow & Unfollow Mutation
  const followUserMutation = useMutation({
    mutationKey: ['follow'],
    mutationFn: followUserAPI,
  });

  console.log(data);

  //! Handler for follow mutation
  const followUserHandler = async () => {
    followUserMutation
      .mutateAsync(targetId)
      .then(() => {
        //! Update the profile after following
        refetchProfile();
      })
      .catch(e => console.log(e));
  };

  //! Follow & Unfollow Mutation
  const unfollowUserMutation = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: unfollowUserAPI,
  });

  //! Handler for unfollow mutation
  const unfollowUserHandler = async () => {
    unfollowUserMutation
      .mutateAsync(targetId)
      .then(() => {
        //! Update the profile after unfollowing
        refetchProfile();
      })
      .catch(e => console.log(e));
  };

  //! Likes & dislikes Mutation
  const likePostMutation = useMutation({
    mutationKey: ['likes'],
    mutationFn: likePostAPI,
  });

  //! Handler for like mutation
  const likePostHandler = async () => {
    likePostMutation
      .mutateAsync(postId)
      .then(() => {
        //! Update the profile after unfollowing
        refetchPost();
      })
      .catch(e => console.log(e));
  };

  const dislikePostMutation = useMutation({
    mutationKey: ['dislikes'],
    mutationFn: dislikePostAPI,
  });

  //! Handler for dislike mutation
  const dislikePostHandler = async () => {
    dislikePostMutation
      .mutateAsync(postId)
      .then(() => {
        //! Update the profile after unfollowing
        refetchPost();
      })
      .catch(e => console.log(e));
  };

  const commentMutation = useMutation({
    mutationKey: ['create-comment'],
    mutationFn: createCommentAPI,
  });

  //! Formik Config
  const formik = useFormik({
    //! Initial Data
    initialValues: {
      content: '',
    },
    //! Validation
    validationSchema: Yup.object({
      content: Yup.string().required('Comment content is required!'),
    }),
    //! Submit
    onSubmit: values => {
      const data = {
        content: values.content,
        postId,
      };

      commentMutation
        .mutateAsync(data)
        .then(() => {
          refetchPost();
        })
        .catch(e => {
          console.log(e);
        });
    },
  });

  const errorMsg = commentMutation?.error?.response?.data?.message;

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white rounded-lg shadow-lg p-5'>
        <img
          src={data?.postFound?.image?.path}
          alt={data?.postFound?.description}
          className='w-full h-full object-cover rounded-lg mb-4'
        />
        {/* Show messages */}
        <div className='flex gap-4 items-center mb-4'>
          {/* like icon */}
          <span
            className='flex items-center gap-1 cursor-pointer'
            onClick={likePostHandler}
          >
            <FaThumbsUp />
            {data?.postFound?.likes?.length || 0}
          </span>

          {/* Dislike icon */}
          <span
            className='flex items-center gap-1 cursor-pointer'
            onClick={dislikePostHandler}
          >
            <FaThumbsDown />

            {data?.postFound?.dislikes?.length || 0}
          </span>
          {/* views icon */}
          <span className='flex items-center gap-1'>
            <FaEye />
            {data?.postFound?.viewers?.length || 0}
          </span>
        </div>
        {/* follow icon */}
        {userId !== targetId ? (
          isFollowing ? (
            <button
              onClick={unfollowUserHandler}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              <RiUserUnfollowFill className='mr-2' />
              Un Follow
            </button>
          ) : (
            <button
              onClick={followUserHandler}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Follow
              <RiUserFollowLine className='ml-2' />
            </button>
          )
        ) : null}
        {/* author */}
        <span className='ml-2'>{/* {postData?.author?.username} */}</span>
        {/* post details */}
        <div className='flex justify-between items-center mb-3'>
          <div
            className='rendered-html-content mb-2'
            dangerouslySetInnerHTML={{ __html: data?.postFound?.description }}
          />

          {/* Edit delete icon */}
          <div className='flex gap-2'>
            <FaEdit
              className='text-blue-500 cursor-pointer'
              onClick={handleClick}
            />
            <FaTrashAlt
              className='text-red-500 cursor-pointer'
              onClick={() => deleteHandler(data?.postFound?._id)}
            />
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={formik.handleSubmit}>
          <textarea
            className='w-full border border-gray-300 p-2 rounded-lg mb-2'
            rows='3'
            placeholder='Add a comment...'
            value={comment}
            {...formik.getFieldProps('content')}
          ></textarea>
          {/* comment error */}
          {formik.touched.content && formik.errors.content && (
            <div className='text-red-500 mb-4 mt-1'>
              {formik.errors.content}
            </div>
          )}
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-lg px-4 py-2'
          >
            <FaComment className='inline mr-1' /> Comment
          </button>
        </form>
        {isLoading && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        {isError && <AlertMessage type='error' message={errorMsg} />}
        {/* Comments List */}
        <div>
          <h2 className='text-xl font-bold mb-2'>Comments:</h2>
          {data?.postFound?.comments?.map((comment, index) => (
            <div key={index} className='border-b border-gray-300 mb-2 pb-2'>
              <p className='text-gray-800'>{comment.content}</p>
              <span className='text-gray-600 text-sm'>
                - {comment.author?.username}
              </span>
              <small className='text-gray-600 text-sm ml-2'>
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
