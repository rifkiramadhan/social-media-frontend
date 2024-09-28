import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { NotificationsVersion } from '../../utils/baseEndpointVersion/notificationsVersion/notificationsVersion';
import { NotificationsGrouping } from '../../utils/baseEndpointGrouping/notificationsGrouping/notificationsGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${NotificationsVersion}/${NotificationsGrouping}`;

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
