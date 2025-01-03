import axios from "axios";
import { getToken } from '@/utils/authToken'
import { Product } from '@/types/product.types'

const API_URL = 'http://localhost:3000/product/';

export const loadProductsFromAPI = async (filters?: object) => {
  const token = getToken()

  const response = await axios({
    method: 'get',
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: filters
  })

  return response.data
}

export const deleteProductFromAPI = async (id: string) => {
  const token = getToken()

  const response = await axios({
    method: 'delete',
    url: API_URL,
    data: { id },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}

export const uploadImagesFromAPI = async (formData: FormData) => {
  const token = getToken()

  const response = await axios({
    method: 'post',
    url: `${API_URL}images`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}

export const createProductFromAPI = async (data: Product) => {
  const token = getToken()

  const response = await axios({
    method: 'post',
    url: `${API_URL}create`,
    data: { data },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}

export const fetchProductFromAPI = async (url: string | number | null | undefined) => {
  const token = getToken()

  const response = await axios({
    method: 'post',
    url: `${API_URL}map-product`,
    data: { 
      url
    },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}

export const fetchProductByIdFromAPI = async (id: string | undefined) => {
  const token = getToken()

  const response = await axios({
    method: 'get',
    url: `${API_URL}${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}

export const editProductFromAPI = async (id: string | undefined, data: Product) => {
  const token = getToken()

  const response = await axios({
    method: 'patch',
    url: `${API_URL}edit/${id}`,
    data: { data },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  return response.data
}