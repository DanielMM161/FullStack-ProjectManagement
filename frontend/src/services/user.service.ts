import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../utils/constants';

const getAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
    Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

export { getAllUsers };
