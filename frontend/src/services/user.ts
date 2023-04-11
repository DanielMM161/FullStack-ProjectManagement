import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';

const getAllUsers = createAsyncThunk('fetchAllUsers', async () => {  
  return await instance.get('users')
  .then(result => {
    return result.data;
  })
  .catch(err => {
    console.error('Error getAllUsers -> ', err);    
    return []
  });
});

export default getAllUsers;
