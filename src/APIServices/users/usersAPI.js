import { BASE_URL } from '../../utils/baseEndpoint';
import axios from 'axios';

//! Register user
export const registerAPI = async userData => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
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
    `${BASE_URL}/users/login`,
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
  const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
    withCredentials: true,
  });

  return response.data;
};

//---- User Profile ----//
export const userProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    withCredentials: true,
  });

  return response.data;
};

//---- Logout User ----//
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
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
    `${BASE_URL}/users/follow/${userId}`,
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
    `${BASE_URL}/users/unfollow/${userId}`,
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
    `${BASE_URL}/users/account-verification-email`,
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
    `${BASE_URL}/users/update-email`,
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
    `${BASE_URL}/users/verify-account/${verifyToken}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//! Forgot Password
export const forgotPasswordAPI = async email => {
  const response = await axios.post(
    `${BASE_URL}/users/forgot-password`,
    {
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
    `${BASE_URL}/users/upload-profile-picture`,
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
    `${BASE_URL}/users/reset-password/${data?.verifyToken}`,
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
  const response = await axios.get(`${BASE_URL}/users/lists`, {
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
