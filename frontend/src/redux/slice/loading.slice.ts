import { createSlice } from '@reduxjs/toolkit';
import { initialLoadingState } from '../../models/loading.model';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = action.payload;
    },
    closeLoading: (state) => {
      console.log('close loading');
      state.loading = initialLoadingState.loading;
    },
  },
  extraReducers: (build) => {},
});

export const { showLoading, closeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
