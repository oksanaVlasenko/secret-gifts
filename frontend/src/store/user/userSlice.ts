import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';
import { RootState } from '../index'
import { getToken } from '@/utils/authToken';

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  token: null,
  isAuthenticated: false,  
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;  
      state.loading = false; 
    },
    logout(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    checkAuth(state) {
      const token = getToken();

      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      } else {
        state.isAuthenticated = false;
      }

      state.loading = false;  
    },
    startLoading(state) {
      state.loading = true;  
    },
  }
});

export const { setUser, logout, checkAuth, startLoading } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
