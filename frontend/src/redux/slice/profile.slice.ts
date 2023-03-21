import { createSlice } from '@reduxjs/toolkit';
import { initialProfileState } from '../../models/profile.model';
import { getProfile, register } from '../../services/auth.service';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (build) => {
    /** fulfilled */
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    build.addCase(register.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default profileSlice.reducer;
