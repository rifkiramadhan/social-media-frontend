import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { EarningsVersion } from '../../utils/baseEndpointVersion/earningsVersion/earningsVersion';
import { EarningsGrouping } from '../../utils/baseEndpointGrouping/earningsGrouping/earningsGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${EarningsVersion}/${EarningsGrouping}`;

//! Fetch All Earrnings
export const fetchAllEarningsAPI = async () => {
  const earnings = await axios.get(BASE_URL);

  return earnings.data;
};

//! Fetch All User Earnings
export const getMyEarningsAPI = async () => {
  const earnings = await axios.get(`${BASE_URL}/my-earnings`, {
    withCredentials: true,
  });

  return earnings.data;
};
