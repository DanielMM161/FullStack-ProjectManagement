import { createSlice } from '@reduxjs/toolkit';
import { initialProfileState } from '../../models/profile';
import { emptyUser } from '../../models/user';
import { getProfile, register } from '../../services/auth';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('profile');
      localStorage.removeItem('token');
      state.profile = emptyUser;
    },
  },
  extraReducers: (build) => {
    /** fulfilled */
    build.addCase(getProfile.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        state.profile = payload;
      } else {
        state.profile = emptyUser;
      }
    });
    build.addCase(register.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) state.profile = payload;
    });
  },
});

export const { logOut } = profileSlice.actions;

export default profileSlice.reducer;
