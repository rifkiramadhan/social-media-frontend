import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/earnings';

//! Fetch All Categories
export const fetchAllEarningsAPI = async () => {
  const earnings = await axios.get(BASE_URL);

  return earnings.data;
};
