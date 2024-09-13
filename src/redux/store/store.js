import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';

//! Create store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
