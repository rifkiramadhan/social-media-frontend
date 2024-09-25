import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/earnings';

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
