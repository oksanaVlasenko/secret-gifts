import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
