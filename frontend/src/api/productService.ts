import axios from "axios";
import { getToken } from '@/utils/authToken'

const token = getToken()
const API_URL = 'http://localhost:3000/product/';

export const loadProducts = async () => {
  const response = await axios({
    method: 'get',
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}