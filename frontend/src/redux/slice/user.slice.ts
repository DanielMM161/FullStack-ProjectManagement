import { createSlice } from '@reduxjs/toolkit';
import { initialUserState, SliceStateUser } from '../../models/user.model';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: initialUserState,
//   reducers: {},
//   extraReducers: (build) => {
//     /** fulfilled */
//     build.addCase(getProfile.fulfilled, (state: SliceStateUser, action) => {
//       state.user = action.payload;
//     });
//     build.addCase(register.fulfilled, (state: SliceStateUser, action) => {
//       state.user = action.payload;
//     });
//   },
// });

// export default userSlice.reducer;
