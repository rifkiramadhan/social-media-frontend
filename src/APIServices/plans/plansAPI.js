import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { PlansVersion } from '../../utils/baseEndpointVersion/plansVersion/plansVersion';
import { PlansGrouping } from '../../utils/baseEndpointGrouping/plansGrouping/plansGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${PlansVersion}/${PlansGrouping}`;

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
