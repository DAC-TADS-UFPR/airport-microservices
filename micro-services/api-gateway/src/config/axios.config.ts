import axios from 'axios';
import { Request } from 'express';
import { extractToken } from '../middleware/auth';

export const setupAxiosInterceptors = (req: Request) => {
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();

  axios.interceptors.request.use(
    (config) => {
      const token = extractToken(req);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`Request to ${config.url} with token present`);
      } else {
        console.warn('No token found in request');
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(`Response from ${response.config.url}: ${response.status}`);
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(`Error response from ${error.config.url}:`, {
          status: error.response.status,
          data: error.response.data
        });
      } else if (error.request) {
        console.error('No response received:', error.message);
      } else {
        console.error('Error setting up request:', error.message);
      }
      return Promise.reject(error);
    }
  );
};