import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchNotificationsAPI,
  readNotificationAPI,
} from '../../../APIServices/notifications/notificationsAPI';

const NotificationLists = () => {
  const { data, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotificationsAPI,
  });

  //! Filter unread notifications
  const unreadNotifications = data?.filter(
    notification => notification?.isRead === false
  );

  //! Notification Mutation
  const notificationMutation = useMutation({
    mutationKey: ['read-notification'],
    mutationFn: readNotificationAPI,
  });

  //read notification handler
  const readNotificationHandler = id => {
    notificationMutation
      .mutateAsync(id)
      .then(() => {
        refetch();
      })
      .catch(e => console.log(e));
  };

  return (
    <div className='flex justify-center items-start h-screen bg-gray-100'>
      <div className='max-w-md w-full mt-5 bg-white rounded-lg shadow-4xl overflow-hidden'>
        <div className='bg-red-800 p-4 text-white text-lg font-semibold rounded-t-lg'>
          Notifications
        </div>
        <div className='max-h-96 mt-3 overflow-auto'>
          {unreadNotifications?.length === 0 ? (
            <p className='text-center text-gray-600 py-4'>
              No new notifications
            </p>
          ) : (
            unreadNotifications?.map(notification => (
              <div
                key={notification.id}
                onClick={() => readNotificationHandler(notification?._id)}
              >
                <div className='border-b cursor-pointer border-gray-200 px-4 py-3 hover:bg-gray-50 transition duration-300 ease-in-out'>
                  <p className='text-sm text-gray-800 font-medium'>
                    {notification.message}
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationLists;
