import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState, Category } from './types';
import { RootState } from '../index'

const initialState: CategoryState = {
  categories: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<{ categories: Category[] }>) {
      state.categories = action.payload.categories
    },
  }
});

export const { setCategories } = categoriesSlice.actions;
export const categories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
