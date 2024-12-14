import axios from "axios";
import { getToken } from '@/utils/authToken'

const token = getToken()
const API_URL = 'http://localhost:3000/category/';

export const fetchCategoriesFromAPI = async () => {
  const response = await axios({
    method: 'get',
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data;
};

export const deleteCategoryFromAPI = async (id: string | number) => {
  const response = await axios({
    method: 'delete',
    url: API_URL,
    data: { id },
    headers: { 
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
}

export const createCategoryFromAPI = async (newValue: string | number | null | undefined) => {
  const response = await axios({
    method: 'post',
    url: `${API_URL}create`,
    data: { name: newValue },
    headers: { 
      Authorization: `Bearer ${token}` 
    },
  });
  
  return response.data;
}

export const editCategoryFromAPI = async (id: string | number, value: string | number | null | undefined) => {
  const response = await axios({
    method: 'patch',
    url: `${API_URL}edit/${id}`,
    data: { name: value },
    headers: { 
      Authorization: `Bearer ${token}` 
    },
  });

  return response.data
}
