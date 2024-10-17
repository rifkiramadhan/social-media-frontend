import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
import { AiOutlineUser } from 'react-icons/ai';
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from '../../../APIServices/users/usersAPI';
import { useFormik } from 'formik';
import { createCommentAPI } from '../../../APIServices/comments/commentsAPI';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';
import Avatar from '../../User/Avatar/Avatar';
import PostDetailsSkeleton from './PostDetailsSkeleton';

const PostDetails = () => {
  const [comment] = useState('');
  const navigate = useNavigate();

  //! Get the post id
  const { postId } = useParams();

  //! Use query
  const {
    isError,
    isLoading,
    data,
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

  const editHandler = () => {
    // Ambil pathname dari useLocation
    const pathname = location.pathname;
    // Memisahkan URL menjadi array berdasarkan '/'
    pathname.split('/');

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
        refetchPost();
      })
      .catch(e => console.log(e));
  };

  //! Follow Logic
  //! Get the author id
  const targetId = data?.postFound?.author?._id;

  //! Get the login userid
  const userId = profileData?.user?._id;

  //! Check if user is logged in
  const isLoggedIn = Boolean(userId);

  //! Redirect to login if not logged in
  const redirectToLogin = () => {
    navigate('/login');
  };

  //! Protect actions if not logged in
  const handleProtectedAction = action => {
    if (!isLoggedIn) {
      redirectToLogin(); // Redirect to login if not authenticated
    } else {
      action(); // Execute the action if authenticated
    }
  };

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
    handleProtectedAction(() => {
      followUserMutation
        .mutateAsync(targetId)
        .then(() => {
          refetchProfile();
        })
        .catch(e => console.log(e));
    });
  };

  //! Follow & Unfollow Mutation
  const unfollowUserMutation = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: unfollowUserAPI,
  });

  //! Handler for unfollow mutation
  const unfollowUserHandler = async () => {
    handleProtectedAction(() => {
      unfollowUserMutation
        .mutateAsync(targetId)
        .then(() => {
          refetchProfile();
        })
        .catch(e => console.log(e));
    });
  };

  //! Likes & dislikes Mutation
  const likePostMutation = useMutation({
    mutationKey: ['likes'],
    mutationFn: likePostAPI,
  });

  //! Handler for like mutation
  const likePostHandler = async () => {
    handleProtectedAction(() => {
      likePostMutation
        .mutateAsync(postId)
        .then(() => {
          refetchPost();
        })
        .catch(e => console.log(e));
    });
  };

  const dislikePostMutation = useMutation({
    mutationKey: ['dislikes'],
    mutationFn: dislikePostAPI,
  });

  //! Handler for dislike mutation
  const dislikePostHandler = async () => {
    handleProtectedAction(() => {
      dislikePostMutation
        .mutateAsync(postId)
        .then(() => {
          refetchPost();
        })
        .catch(e => console.log(e));
    });
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

      handleProtectedAction(() => {
        commentMutation
          .mutateAsync(data)
          .then(() => {
            refetchPost();
            formik.resetForm();
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
  });

  const errorMsg = commentMutation?.error?.response?.data?.message;

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  return (
    <div className='mx-auto px-4 sm:px-8 lg:px-8 bg-gray-100'>
      <div className='pt-10'>
        <div className='bg-white rounded-lg shadow-4xl p-2'>
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
                <RiUserFollowLine className='mr-2' />
                Follow
              </button>
            )
          ) : null}
          {/* author */}
          <div className='flex justify-between items-center'>
            <div className='flex font-bold pt-6 pb-3 px-2 gap-2 items-center'>
              {data?.postFound?.author?.profilePicture ? (
                <img
                  src={data?.postFound?.author?.profilePicture?.path}
                  alt={data?.postFound?.author?.profilePicture?.fieldname}
                  className='h-10 w-10 object-cover rounded-full'
                />
              ) : (
                <button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500'>
                  <span className='sr-only'>Open user menu</span>
                  <AiOutlineUser className='h-10 w-10 text-gray-400' />
                </button>
              )}
              <span className='text-gray-600 text-lg'>
                {data?.postFound?.author?.username}
              </span>
            </div>
            {/* post details */}
            {userId === targetId ? (
              <div className='flex gap-2'>
                <button
                  onClick={editHandler}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  <FaEdit className='text-white cursor-pointer' />
                  <span className='ml-2'>Edit</span>
                </button>
                <button
                  onClick={() => deleteHandler(data?.postFound?._id)}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                >
                  <FaTrashAlt className='text-white cursor-pointer' />
                  <span className='ml-2'>Delete</span>
                </button>
              </div>
            ) : null}
          </div>
          <div className='flex justify-between items-center mb-3 mt-6'>
            <div
              className='rendered-html-content mb-2'
              dangerouslySetInnerHTML={{ __html: data?.postFound?.description }}
            />

            {/* Edit delete icon */}
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-4xl p-2 mt-5'>
          {/* Comment Form */}
          <form onSubmit={formik.handleSubmit}>
            <textarea
              className='w-full border border-gray-200 p-2 rounded-lg mb-2'
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
          {/* {isLoading && (
            <AlertMessage type='loading' message='Loading please wait...' />
          )} */}
          {isError && <AlertMessage type='error' message={errorMsg} />}
          {/* Comments List */}
          <div>
            <h2 className='text-xl font-bold mb-6 mt-6'>Comments:</h2>
            {data?.postFound?.comments
              ?.slice()
              .reverse()
              .map((comment, index) => (
                <div key={index} className='border-b border-gray-200 mb-2 pb-2'>
                  <div className='flex font-bold items-center gap-2'>
                    {comment?.author?.profilePicture?.path ? (
                      <img
                        src={comment?.author?.profilePicture?.path}
                        alt={comment?.author?.profilePicture?.fieldname}
                        className='h-5 w-5 object-cover rounded-full'
                      />
                    ) : (
                      <Avatar />
                    )}
                    <span className='text-gray-600 text-sm'>
                      {comment.author?.username}
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={4}
                      height={4}
                      viewBox='0 0 4 4'
                      fill='none'
                    >
                      <circle cx={2} cy={2} r={2} fill='#B8B8B8' />
                    </svg>
                    <small className='text-gray-400 text-xs'>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className='mt-2 text-gray-600'>{comment.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
