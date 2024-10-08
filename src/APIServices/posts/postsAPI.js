import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { PostsVersion } from '../../utils/baseEndpointVersion/postsVersion/postsVersion';
import { PostsGrouping } from '../../utils/baseEndpointGrouping/postsGrouping/postsGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${PostsVersion}/${PostsGrouping}`;

//! Create Post API
export const createPostAPI = async postData => {
  const response = await axios.post(`${BASE_URL}/create`, postData, {
    withCredentials: true,
  });
  return response.data;
};

//!update post api
export const updatePostAPI = async ({ formData, postId }) => {
  const response = await axios.put(`${BASE_URL}/${postId}`, formData, {
    withCredentials: true,
  });

  return response.data;
};

//! Fetch All Posts
export const fetchAllPosts = async filters => {
  const posts = await axios.get(BASE_URL, {
    params: filters,
  });

  return posts.data;
};

//! Fetch Posts
export const fetchPost = async postId => {
  const posts = await axios.get(`${BASE_URL}/${postId}`, {
    withCredentials: true,
  });

  return posts.data;
};

//! Delete Posts
export const deletePostAPI = async postId => {
  const posts = await axios.delete(`${BASE_URL}/${postId}`, {
    withCredentials: true,
  });

  return posts.data;
};

//! Like Post API
export const likePostAPI = async postId => {
  const response = await axios.put(
    `${BASE_URL}/likes/${postId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//! Dislike Post API
export const dislikePostAPI = async postId => {
  const response = await axios.put(
    `${BASE_URL}/dislikes/${postId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
