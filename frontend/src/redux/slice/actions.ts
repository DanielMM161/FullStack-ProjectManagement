import { createSlice } from '@reduxjs/toolkit';
import { initialActionsState, initialLoadingState } from '../../models/actions';
import { createProject } from '../../services/project';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: initialActionsState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = action.payload;
    },
    closeLoading: (state) => {
      //state.loading = initialLoadingState;
    },
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
  extraReducers: (build) => {
    build.addCase(createProject.pending, (state, action) => {
      console.log("create project pending") 
      state.loading = {
        title: 'Creating Project',
        show: true
      }
    }),
    build.addCase(createProject.fulfilled, (state, action) => {      
      state.loading = initialLoadingState;
    })
    build.addCase(createProject.rejected, (state, action) => {
      console.log("create project rejected")
    })
  },
});

export const { showLoading, closeLoading, toggleSideBar } = actionsSlice.actions;

export default actionsSlice.reducer;
