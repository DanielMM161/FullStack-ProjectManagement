import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseService } from './BaseCrudService';

const getAllUsers = createAsyncThunk('fetchAllUsers', async () => {  
  return await baseService.get('users')
  .then(result => {
    return result;
  })
  .catch(err => {
    console.error('Error getAllUsers -> ', err);    
    return []
  });
});

export default getAllUsers;
