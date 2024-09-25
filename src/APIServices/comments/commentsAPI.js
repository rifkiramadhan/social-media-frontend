import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/comments';

//! Create Comment API
export const createCommentAPI = async commentData => {
  const response = await axios.post(`${BASE_URL}/create`, commentData, {
    withCredentials: true,
  });
  return response.data;
};
