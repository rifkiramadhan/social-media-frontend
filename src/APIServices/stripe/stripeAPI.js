import axios from 'axios';
import { BASE_URL_API } from '../../utils/baseEndpointURL';
import { StripeVersion } from '../../utils/baseEndpointVersion/stripeVersion/stripeVersion';
import { StripeGrouping } from '../../utils/baseEndpointGrouping/stripeGrouping/stripeGrouping';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${StripeVersion}/${StripeGrouping}`;

//! Create Post API
export const paymentIntentAPI = async planId => {
  const response = await axios.post(
    `${BASE_URL}/checkout`,
    {
      subscriptionPlanId: planId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//! Payment Verification
export const paymentVerificationAPI = async paymentId => {
  const response = await axios.get(`${BASE_URL}/verify/${paymentId}`, {
    withCredentials: true,
  });
  return response.data;
};

//! Free Plan
export const freePlanAPI = async () => {
  const response = await axios.get(`${BASE_URL}/free-plan`, {
    withCredentials: true,
  });
  return response.data;
};
