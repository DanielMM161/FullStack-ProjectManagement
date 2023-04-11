import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, RegisterRequest } from './request/user';
import { handleThunkApi, showNotification } from '../utils/common';
import { AuthResponse } from './response/auth';
import { UserResponse } from './response/user';
import { closeLoading } from '../redux/slice/actions';
import http from '../utils/constants';

const getProfile = createAsyncThunk('profile', async (_, thunkApi) => {
  return await http
    .get<UserResponse>('auths/profile')
    .then((result) => {
      localStorage.setItem('profile', JSON.stringify(result.data));
      return result.data;
    })
    .catch((err) => {
      console.error('Error getProfile -> ', err);
      showNotification('Login', 'Error Login', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const login = createAsyncThunk('login', async (payload: LoginRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Welcome');
  return await http
    .post<AuthResponse>('auths/login', payload)
    .then((result) => {
      const value = result.data as AuthResponse;
      localStorage.setItem('token', JSON.stringify(value.token));
      return !null;
    })
    .catch((err) => {
      console.error('Error login -> ', err);
      showNotification('Login', 'Error Login', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const register = createAsyncThunk('register', async (request: RegisterRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Registering');
  return await http
    .post<UserResponse>('users', request)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error register -> ', err);
      showNotification('Register', 'Error Register', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

export { getProfile, login, register };
