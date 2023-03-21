import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';

const getAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get('users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

export default getAllUsers;
