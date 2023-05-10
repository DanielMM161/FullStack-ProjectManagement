import { createSlice } from '@reduxjs/toolkit';
import { initialLoadingState } from '../../models/loading';
import { createProject } from '../../services/project';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = action.payload;
    },
    closeLoading: (state) => {
      state.loading = initialLoadingState.loading;
    },
  },
  extraReducers: (build) => {
   
  },
});

export const {} = loadingSlice.actions;

export default loadingSlice.reducer;
