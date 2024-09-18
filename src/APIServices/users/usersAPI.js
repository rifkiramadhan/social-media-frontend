import { BASE_URL } from '../../../utils/baseEndpoint';
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
export const checkAuthStatusAPI = async userData => {
  const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
    withCredentials: true,
  });

  return response.data;
};

//---- User Profile ----//
export const userProfileAPI = async userData => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    withCredentials: true,
  });

  return response.data;
};

//---- Logout User ----//
export const logoutAPI = async userData => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};
