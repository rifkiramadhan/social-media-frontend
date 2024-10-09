import { useMutation, useQuery } from '@tanstack/react-query';
import { FiUserX, FiUserCheck } from 'react-icons/fi';
import {
  listAllUsersAPI,
  toggleUserBlockAPI,
} from '../../../APIServices/users/usersAPI';
import { BASE_URL_API } from '../../../utils/baseEndpointURL';
import { UsersGrouping } from '../../../utils/baseEndpointGrouping/usersGrouping/usersGrouping';
import { UsersVersion } from '../../../utils/baseEndpointVersion/usersVersion/usersVersion';
import Avatar from '../Avatar/Avatar';
import NoDataFound from '../../Alert/NoDataFound/NoDataFound';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';

const BASE_URL = `${BASE_URL_API}/${UsersVersion}/${UsersGrouping}`;

const UsersList = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: listAllUsersAPI,
  });

  const mutation = useMutation({
    mutationKey: ['toggle-block-user'],
    mutationFn: toggleUserBlockAPI,
  });

  const toggleUserBlocking = user => {
    const actionURL = user?.isBlocked
      ? `${BASE_URL}/unblock-user`
      : `${BASE_URL}/block-user`;
    const userId = user._id;

    const data = {
      actionURL,
      userId,
    };

    mutation
      .mutateAsync(data)
      .then(() => {
        refetch();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className='container mx-auto'>
      <div className='txt-2xl font-semibold mb-4'>Users List</div>
      {data?.length <= 0 && <NoDataFound />}
      {isError && <AlertMessage type='error' message='Something happened!' />}
      {isLoading ? (
        <AlertMessage type='loading' message='Loading please wait...' />
      ) : (
        <div className='space-y-3'>
          {data?.map(user => (
            <div
              key={user?._id}
              className='flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-4xl'
            >
              <div className='flex items-center gap-2'>
                {user?.profilePicture?.path ? (
                  <img
                    className='w-10 h-10 rounded-full object-cover'
                    src={user.profilePicture?.path}
                  />
                ) : (
                  <Avatar />
                )}
                <span className='font-bold'>
                  {user?.username} -{' '}
                  <span className='text-gray-400'>{user?.accountType}</span>
                </span>
              </div>

              <button
                className={`flex items-center gap-2 p-2 rounded text-white ${
                  user.isBlocked ? 'bg-red-500' : 'bg-green-500'
                }`}
                onClick={() => toggleUserBlocking(user)}
              >
                {user.isBlocked ? (
                  <FiUserX className='text-xl' />
                ) : (
                  <FiUserCheck className='text-xl' />
                )}
                <span>{user.isBlocked ? 'Unblock' : 'Block'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
