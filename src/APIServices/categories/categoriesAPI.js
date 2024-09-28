import axios from 'axios';
import { CategoriesVersion } from '../../utils/baseEndpointVersion/categoriesVersion/categoriesVersion';
import { CategoriesGrouping } from '../../utils/baseEndpointGrouping/categoriesGrouping/categoriesGrouping';
import { BASE_URL_API } from '../../utils/baseEndpointURL';

//! Create that must return a promise
const BASE_URL = `${BASE_URL_API}/${CategoriesVersion}/${CategoriesGrouping}`;

//! Create Post API
export const addCategoryAPI = async categoryData => {
  console.log(categoryData);
  const response = await axios.post(`${BASE_URL}/create`, categoryData, {
    withCredentials: true,
  });
  return response.data;
};

//! Fetch All Categories
export const fetchCategoriesAPI = async () => {
  const categories = await axios.get(BASE_URL);

  return categories.data;
};
