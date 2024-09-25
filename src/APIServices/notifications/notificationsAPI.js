import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/notifications';

//! Create Post API
export const fetchNotificationsAPI = async () => {
  const notifications = await axios.get(BASE_URL, {
    withCredentials: true,
  });

  return notifications.data;
};

//! Fetch All Categories
export const readNotificationAPI = async notificationId => {
  const notification = await axios.put(`${BASE_URL}/${notificationId}`, {
    withCredentials: true,
  });

  return notification.data;
};
