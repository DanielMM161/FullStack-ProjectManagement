import { createSlice } from '@reduxjs/toolkit';
import { initialActionsState, initialLoadingState } from '../../models/actions';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: initialActionsState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = action.payload;
    },
    closeLoading: (state) => {
      state.loading = initialLoadingState;
    },
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
  extraReducers: (build) => {},
});

export const { showLoading, closeLoading, toggleSideBar } = actionsSlice.actions;

export default actionsSlice.reducer;
