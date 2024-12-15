import { 
  fetchCategoriesFromAPI, 
  deleteCategoryFromAPI, 
  createCategoryFromAPI, 
  editCategoryFromAPI 
} from '@/api/categoryService'

import { setCategories } from '@/store/categories/categoriesSlice'
import { Category } from '@/store/categories/types';
import { handleCatch } from '@/utils/handleCatch';
import { AxiosError } from 'axios';

export const loadCategories = async (dispatch: (arg0: { payload: { categories: Category[] } }) => void) => {
  try {
    const categories = await fetchCategoriesFromAPI();

    if (categories && categories.length > 0) {
      console.log(categories, ' categories')
      const formattedCategories = categories.map((c: { '_id': string, 'name': string, 'productsCount': number }) => {
        return {
          id: c._id,
          label: c.name,
          deleteIcon: true
        }
      })
      
      dispatch(setCategories({ categories: formattedCategories }));
    } else {
      dispatch(setCategories({ categories: [] }));
    }
    
  } catch (error) {
    handleCatch(error);
  }
};

export const createCategory = async (dispatch: (arg0: { payload: { categories: Category[] } }) => void, newValue: string | number | null | undefined) => {
  try {
    await createCategoryFromAPI(newValue);
    loadCategories(dispatch)
    return { success: true };
  } catch (error) {
    handleCatch(error);

    let errorMessage: string = ''
      
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        errorMessage = 'Not unique value'
      }
    } 

    return { success: false, error: errorMessage };
  }
};

export const editCategory = async (dispatch: (arg0: { payload: { categories: Category[] } }) => void, id: string | number, value: string | number | null | undefined) => {
  try {
    await editCategoryFromAPI(id, value);
    loadCategories(dispatch)
    return { success: true };
  } catch (error) {
    handleCatch(error);

    let errorMessage: string = ''
      
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        errorMessage = 'Not unique value'
      }
    } 

    return { success: false, error: errorMessage };
  }
}

export const deleteCategory = async (dispatch: (arg0: { payload: { categories: Category[] } }) => void, id: string | number) => {
  try {
    await deleteCategoryFromAPI(id);
    loadCategories(dispatch)
    return { success: true };
  } catch (error) {
    handleCatch(error);

    let errorMessage: string = ''
      
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        errorMessage = 'Not unique value'
      }
    } 

    return { success: false, error: errorMessage };
  }
}