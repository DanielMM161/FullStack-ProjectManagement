import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileInitialState, initialProfileState } from '../../models/profile';
import { User, emptyUser } from '../../models/user';
import { LoginGoogleAuth, LoginRequest, RegisterRequest, UpdateProfile } from '../../services/request/user';
import { HttpService, defaultHeader } from '../../services/HttpService';

class ProfileSlice {
  
  constructor() {
    this.httpService = new HttpService("Profile");
    this.slice = createSlice({
      name: 'profile',
      initialState: initialProfileState,
      reducers: {
      },
      extraReducers: (build) => {
        /** fulfilled */
        build.addCase(this.login.fulfilled, (_, action) => {                    
          return { profile: action.payload }                                    
        })
        build.addCase(this.register.fulfilled, (_, action) => {          
          return { profile: action.payload }
        })
        build.addCase(this.logout.fulfilled, () => {                   
          return { profile: emptyUser }
        })
        build.addCase(this.updateProfile.fulfilled, (_, action) => {                   
          return { profile: action.payload }
        })
        build.addCase(this.uploadImageProfile.fulfilled, (state, action) => {
          return { profile:  {...state.profile, pictureProfile: action.payload}  }
        })
      },
    });
  }

  slice: Slice<ProfileInitialState>
  httpService: HttpService
  
  login = createAsyncThunk<any, LoginRequest, { rejectValue: null}>('login', async (payload: LoginRequest, thunkApi) => {
    const response = await this.httpService.post<LoginRequest, User>('auths/login', payload);

    if (response) {
      localStorage.setItem('profile', JSON.stringify(response));
      localStorage.setItem('token', JSON.stringify(response.token));
      return thunkApi.fulfillWithValue(response)
    }

    return thunkApi.rejectWithValue(response);
  });
  
  logout = createAsyncThunk('logout', async (_, thunkApi) => {
    const response = await this.httpService.post<unknown, boolean>('auths/logout');

    if (response) {
      localStorage.removeItem('profile');
      localStorage.removeItem('token');
      return thunkApi.fulfillWithValue(response);
    }

    return thunkApi.rejectWithValue(response);   
  });
  
  register = createAsyncThunk('register', async (request: RegisterRequest, thunkApi) => {
    const response = await this.httpService.post<RegisterRequest, User>('users', request);

    if (response) {
      localStorage.setItem('profile', JSON.stringify(response));
      localStorage.setItem('token', JSON.stringify(response.token));
      return thunkApi.fulfillWithValue(response);
    }
      
    return thunkApi.rejectWithValue(response);
  });
  
  loginGoogle = createAsyncThunk('loginGoogle', async (payload: LoginGoogleAuth, thunkApi) => {
    const response = await this.httpService.post<LoginGoogleAuth, User>('auths/login/google', payload);

    if (response) {
      localStorage.setItem('profile', JSON.stringify(response));
      localStorage.setItem('token', JSON.stringify(response.token));
      return thunkApi.fulfillWithValue(response);
    }
      
    return thunkApi.rejectWithValue(response);
  });

  updateProfile = createAsyncThunk('updateProfile', async (request: UpdateProfile, thunkApi) => {
    const response = await this.httpService.update<UpdateProfile, User>('users', request);
    if (response) return thunkApi.fulfillWithValue(response);
    return thunkApi.rejectWithValue(response);
  });

  uploadImageProfile = createAsyncThunk('updateImageProfile', async (request: FormData, thunkApi) => {
    const response = await this.httpService.post<FormData, string>('users/profile-picture', request, defaultHeader.multiPart);
    if (response) return thunkApi.fulfillWithValue(response);
    return thunkApi.rejectWithValue(response);
  });
}

export const profileSlice = new ProfileSlice();
export const { register, login, logout, loginGoogle, updateProfile, uploadImageProfile } = profileSlice


