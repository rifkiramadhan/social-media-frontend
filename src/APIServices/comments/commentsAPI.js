import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { CommentsVersion } from '../../utils/baseEndpointVersion/commentsVersion/commentsVersion';
import { CommentsGrouping } from '../../utils/baseEndpointGrouping/commentsGrouping/commentsGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${CommentsVersion}/${CommentsGrouping}`;

//! Create Comment API
export const createCommentAPI = async commentData => {
  const response = await axios.post(`${BASE_URL}/create`, commentData, {
    withCredentials: true,
  });
  return response.data;
};
