import { useMutation, useQuery } from '@tanstack/react-query';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { userProfileAPI } from '../../../../APIServices/users/usersAPI';
import { htmlToText } from 'html-to-text';
import truncateString from '../../../../utils/truncateString';
import { deletePostAPI } from '../../../../APIServices/posts/postsAPI';
import Profile from '../../Settings/Profile/Profile';
import NoDataFound from '../../../Alert/NoDataFound/NoDataFound';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';
import DashboardPostsSkeleton from './DashboardPostsSkeleton';
import MyPostSkeleton from './MyPostSkeleton';

const DashboardPosts = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userProfileAPI,
  });

  //! Delete Mutation
  const deletePostMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePostAPI,
  });

  //! Handle Delete Post
  const handleDelete = postId => {
    deletePostMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch(e => {
        console.log(e);
      });
  };

  console.log(data);

  const userPosts = data?.user?.posts;

  return (
    <section className='py-2'>
      {userPosts?.length < 0 ? (
        <div>No posts yet</div>
      ) : (
        <section className='py-2'>
          <Profile />
          <div className='container mx-auto'>
            <div className='pt-20 bg-white shadow-4xl rounded-b-lg'>
              <div className='px-4 pb-4 border-b'>
                <h3 className='text-xl font-bold'>
                  {isLoading ? (
                    <MyPostSkeleton />
                  ) : (
                    `My Posts (` + userPosts?.length + `)`
                  )}
                </h3>
              </div>
              {data?.length <= 0 && <NoDataFound />}
              {isError && (
                <AlertMessage type='error' message='Something happened!' />
              )}
              {isLoading ? (
                <DashboardPostsSkeleton />
              ) : (
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Post
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          This Month Earning
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Total Earnings
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Date Created
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Upcoming Earning Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {userPosts?.map(post => (
                        <tr key={post?._id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='flex-shrink-0 h-10 w-10'>
                                <img
                                  className='h-10 w-10 rounded-full object-cover'
                                  src={post?.image?.path}
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <Link
                                  className='text-sm font-medium text-gray-900 hover:underline'
                                  to={`/posts/${post?._id}`}
                                >
                                  {truncateString(
                                    htmlToText(post?.description),
                                    10
                                  )}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            $ {post?.thisMonthEarnings || 0}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            $ {post?.totalEarnings || 0}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {new Date(post.createdAt).toDateString()}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                              {new Date(post.nextEarningDate).toDateString()}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <Link
                              to={`/dashboard/update-post/${post._id}`}
                              className='inline-flex gap-1 items-center text-indigo-600 hover:text-indigo-900 mr-4'
                            >
                              <FiEdit />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(post._id)}
                              className='inline-flex gap-1 items-center text-red-600 hover:text-red-900'
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DashboardPosts;
