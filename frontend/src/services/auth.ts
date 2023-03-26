import { createAsyncThunk } from '@reduxjs/toolkit';
import { emptyUser } from '../models/user';
import instance from '../utils/constants';
import { LoginRequest, RegisterRequest } from './request/user';
import { showNotification } from '../utils/common';
import { showLoading } from '../redux/slice/loading';
import { Loading } from '../models/loading';

const getProfile = createAsyncThunk('profile', async (_, thunkAPI) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get('auths/profile', {
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

const login = createAsyncThunk('login', async (payload: LoginRequest, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Welcome',
      show: true,
    } as Loading),
  );
  try {
    const response = await instance.post('auths/login', payload);

    if (response.status === 200) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response.data;
    }
    showNotification('Login', 'Error Login', 'danger');
    return emptyUser;
  } catch (error) {
    showNotification('Login', 'Error Login', 'danger');
    return emptyUser;
  }
});

const register = createAsyncThunk('register', async (payload: RegisterRequest, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Registering',
      show: true,
    } as Loading),
  );
  try {
    const response = await instance.post('users', {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    if (response.status === 200) {
      showNotification('Register', 'Register successfully', 'success');
      return response.data;
    }

    showNotification('Register', 'Error Register', 'danger');
    return null;
  } catch (error) {
    showNotification('Register', 'Error Register', 'danger');
    return null;
  }
});

export { getProfile, login, register };
