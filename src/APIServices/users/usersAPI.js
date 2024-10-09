import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { UsersVersion } from '../../utils/baseEndpointVersion/usersVersion/usersVersion';
import { UsersGrouping } from '../../utils/baseEndpointGrouping/usersGrouping/usersGrouping';

const BASE_URL = `${BASE_URL_API}/${UsersVersion}/${UsersGrouping}`;

//! Register user
export const registerAPI = async userData => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    {
      username: userData?.username,
      password: userData?.password,
      email: userData?.email,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Login user
export const loginAPI = async userData => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    {
      username: userData?.username,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//---- Check Auth Status User ----//
export const checkAuthStatusAPI = async () => {
  const response = await axios.get(`${BASE_URL}/checkAuthenticated`, {
    withCredentials: true,
  });

  return response.data;
};

//---- User Profile ----//
export const userProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });

  return response.data;
};

//---- Logout User ----//
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Follow user
export const followUserAPI = async userId => {
  const response = await axios.put(
    `${BASE_URL}/follow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Un Folow user
export const unfollowUserAPI = async userId => {
  const response = await axios.put(
    `${BASE_URL}/unfollow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Send email verification token
export const sendEmailVerificationTokenAPI = async () => {
  const response = await axios.put(
    `${BASE_URL}/account-verification-email`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Update email verification token
export const sendUpdateEmailAPI = async email => {
  const response = await axios.put(
    `${BASE_URL}/update-email`,
    {
      email,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Send verify user account
export const sendVerifyUserAccountAPI = async verifyToken => {
  const response = await axios.put(
    `${BASE_URL}/verify-account/${verifyToken}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Forgot Password
export const forgotPasswordAPI = async ({ email, username }) => {
  const response = await axios.post(
    `${BASE_URL}/forgot-password`,
    {
      username,
      email,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Upload Profile Picture
export const uploadProfilePictureAPI = async formData => {
  const response = await axios.put(
    `${BASE_URL}/upload-profile-picture`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Reset Password
export const resetPasswordAPI = async data => {
  const response = await axios.post(
    `${BASE_URL}/reset-password/${data?.verifyToken}`,
    {
      password: data?.password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! List All Users
export const listAllUsersAPI = async () => {
  const response = await axios.get(`${BASE_URL}/lists`, {
    withCredentials: true,
  });

  return response.data;
};

//! Togle Blocking
export const toggleUserBlockAPI = async data => {
  const response = await axios.put(
    data?.actionURL,
    {
      userId: data?.userId,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
