import { useQuery } from '@tanstack/react-query';
import { userProfileAPI } from '../../../../APIServices/users/usersAPI';
import { AiOutlineUser } from 'react-icons/ai';
import NoDataFound from '../../../Alert/NoDataFound/NoDataFound';
import AlertMessage from '../../../Alert/AllertMessage/AllertMessage';
import MyFollowersSkeleton from './MyFollowersSkeleton';

const MyFollowers = () => {
  //! Fetch userProfile
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: userProfileAPI,
  });

  //! Get the user following
  const myFollowers = data?.user?.followers;

  if (isLoading) {
    return <MyFollowersSkeleton />;
  }

  return (
    <section className='relative py-20 md:py-32 overflow-hidden bg-gray-100'>
      <div className='relative container px-4 mx-auto'>
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl mx-auto mb-20 text-center'>
            <h1 className='font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-gray-900 mb-8'>
              <span>
                My <span className='text-orange-900'>Followers</span>
              </span>
            </h1>
            <p className='text-lg text-gray-500 mb-6'>
              Here are all the people who follow you.
            </p>
          </div>
          {data?.length <= 0 && <NoDataFound />}
          {isError && (
            <AlertMessage type='error' message='Something happened!' />
          )}
          <div className='flex flex-wrap -mx-4 -mb-8'>
            {myFollowers?.map(follower => {
              return (
                <div
                  key={follower?._id}
                  className='w-full md:w-1/2 lg:w-1/3 px-4 mb-8'
                >
                  <div className='max-w-md mx-auto py-10 px-6 text-center bg-white rounded-lg shadow-4xl'>
                    {follower?.profilePicture?.path ? (
                      <img
                        className='w-24 h-24 rounded-full object-cover block mb-6 mx-auto'
                        src={follower?.profilePicture?.path}
                      />
                    ) : (
                      <AiOutlineUser className='w-24 h-24 rounded-full object-cover block mb-6 mx-auto' />
                    )}
                    <h5 className='text-2xl font-bold text-gray-900 mb-2'>
                      {follower?.username}
                    </h5>
                    <span className='block text-orange-900 mb-3'>
                      {follower?.email || 'No email'}
                    </span>
                    <div className='flex items-center justify-center'></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFollowers;
