import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileInitialState, initialProfileState } from '../../models/profile';
import { User, emptyUser } from '../../models/user';
import { ErrorResponse, baseService } from '../../services/BaseCrudService';
import { isInstanceOf } from '../../utils/common';
import { LoginGoogleAuth, LoginRequest, RegisterRequest } from '../../services/request/user';
import { AuthResponse } from '../../services/response/auth';

class ProfileSlice {
  constructor() {
    this.slice = createSlice({
      name: 'profile',
      initialState: initialProfileState,
      reducers: {
      },
      extraReducers: (build) => {
        /** fulfilled */
        build.addCase(this.getProfile.fulfilled, (_, action) => {                    
          return { profile: action.payload }                                    
        })
        build.addCase(this.register.fulfilled, (_, action) => {          
          return { profile: action.payload }
        })
        build.addCase(this.logout.fulfilled, () => {                   
          return { profile: emptyUser }
        })
        /** rejected */
        build.addCase(this.getProfile.rejected, () => {                    
          return { profile: emptyUser }                                    
        })
      },
    });
  }

  slice: Slice<ProfileInitialState>

  getProfile = createAsyncThunk('profile', async (_, thunkApi) => {
    const response = await baseService.get<User>('auths/profile');

    if (!Array.isArray(response) && isInstanceOf<User>(response, 'email')) {
      localStorage.setItem('profile', JSON.stringify(response));
      return thunkApi.fulfillWithValue(response);
    }

    return thunkApi.rejectWithValue(response);        
  });
  
  login = createAsyncThunk('login', async (payload: LoginRequest, thunkApi) => {
    const response = await baseService.post<LoginRequest, AuthResponse>('auths/login', payload);

    if (isInstanceOf<AuthResponse>(response, 'token')) {          
      localStorage.setItem('token', JSON.stringify(response.token));
      return thunkApi.dispatch(this.getProfile());
    }

    return thunkApi.rejectWithValue(response);
  });
  
  logout = createAsyncThunk('logout', async (_, thunkApi) => {
    const response = await baseService.post<unknown, boolean>('auths/logout');

    if (!isInstanceOf<ErrorResponse>(response, 'message')) {
      localStorage.removeItem('profile');
      localStorage.removeItem('token');
      return thunkApi.fulfillWithValue(response);
    }

    return thunkApi.rejectWithValue(response);   
  });
  
  register = createAsyncThunk('register', async (request: RegisterRequest, thunkApi) => {
    const response = await baseService.post<RegisterRequest, User>('users', request);

    if (isInstanceOf<User>(response, 'firstName')) return thunkApi.fulfillWithValue(response);
      
    return thunkApi.rejectWithValue(response);
  });
  
  loginGoogle = createAsyncThunk('loginGoogle', async (payload: LoginGoogleAuth, thunkApi) => {
    const response = await baseService.post<LoginGoogleAuth, AuthResponse>('googleauths/login', payload);

    if(isInstanceOf<AuthResponse>(response, 'token')) {
      localStorage.setItem('token', JSON.stringify(response.token));
      return thunkApi.dispatch(this.getProfile());
    }

    return thunkApi.rejectWithValue(response);
  });
}

export const profileSlice = new ProfileSlice();
export const { getProfile, register, login, logout, loginGoogle } = profileSlice

