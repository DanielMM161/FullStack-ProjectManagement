import { createAsyncThunk } from '@reduxjs/toolkit';
import { emptyUser } from '../models/user.model';
import instance from '../utils/constants';
import { LoginRequest, RegisterRequest } from './request/user.request';

const getProfile = createAsyncThunk('profile', async () => {
    const token = JSON.parse(localStorage.getItem('token') ?? '');    
    const response = await instance.get('auths/profile',  {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        localStorage.setItem('profile', JSON.stringify(response.data));
        return response.data;
    }

    return emptyUser;
});
  
const login = createAsyncThunk('login', async (payload: LoginRequest) => {
    const response = await instance.post('auths/login', payload)    

    if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data['token']));
        return response.data;
    }

    return emptyUser;
});
  
const register = createAsyncThunk('register', async (payload: RegisterRequest) => {
    const response = await instance.post('users', {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });
  
    if (response.status === 200) {
      return response.data;
    }
  
    return null;
});

export { getProfile, login, register }