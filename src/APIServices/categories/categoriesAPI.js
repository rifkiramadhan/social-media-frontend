import axios from 'axios';

//! Create that must return a promise
const BASE_URL = 'http://localhost:5000/api/v1/categories';

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
