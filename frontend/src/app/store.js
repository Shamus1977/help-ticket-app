import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";

//REducers are located in the slice files
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
