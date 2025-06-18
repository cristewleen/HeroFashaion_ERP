// src/api/orderService.js
import {apiClient} from './apiClient';

const API_ENDPOINT = '/order-styles/';

// GET all records
export const getOrderStyles = () => {
  return apiClient.get(API_ENDPOINT);
};

// CREATE a new record
export const createOrderStyle = (data) => {
  return apiClient.post(API_ENDPOINT, data);
};

// UPDATE a record by its ID
export const updateOrderStyle = (id, data) => {
  return apiClient.put(`${API_ENDPOINT}${id}/`, data);
};

// DELETE a record by its ID
export const deleteOrderStyle = (id) => {
  return apiClient.delete(`${API_ENDPOINT}${id}/`);
};