import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const getAllUsers = createAsyncThunk('fetchAllUsers', async () => {  
  return await api.get('users')
  .then(result => {
    return result.data;
  })
  .catch(err => {
    console.error('Error getAllUsers -> ', err);    
    return []
  });
});

export default getAllUsers;
