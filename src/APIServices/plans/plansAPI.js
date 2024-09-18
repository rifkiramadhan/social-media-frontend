import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/plans';

//! Create Post API
export const createPlanAPI = async planData => {
  const response = await axios.post(`${BASE_URL}/create`, planData, {
    withCredentials: true,
  });
  return response.data;
};

//! Fetch All Plans
export const fetchPlansAPI = async () => {
  const plans = await axios.get(BASE_URL);

  return plans.data;
};

//! Fetch Plan
export const fetchPlanAPI = async id => {
  const plan = await axios.get(`${BASE_URL}/${id}`);

  return plan.data;
};
