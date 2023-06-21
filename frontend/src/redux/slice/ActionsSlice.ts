import { Slice, createSlice } from '@reduxjs/toolkit';

import { ActionsSliceState, initialActionsState, initialLoadingState } from '../../models/actions';
import { login, loginGoogle, logout, register, updateProfile, uploadImageProfile } from './ProfileSlice';
import { createProject } from './ProjectSlice';
import { showNotification } from '../../utils/common';

class ActionsSlice {

  constructor() {

    this.slice = createSlice({
      name: 'actions',
      initialState: initialActionsState,
      reducers: {
        showLoading: (state, action) => {
          state.loading = action.payload;
        },
        toggleSideBar: (state) => {
          state.showSideBar = !state.showSideBar;
        },
      },
      extraReducers: (build) => {
        /** Pending */
        // build.addCase(createProject.pending, (state, _) => {      
        //   state.loading = {
        //     title: 'Creating Project',
        //     show: true
        //   }
        // }),
        build.addCase(login.pending || register.pending || loginGoogle.pending, (state, _) => {      
          state.loading = {
            title: 'Welcome',
            show: true
          }
        }),
        build.addCase(logout.pending, (state, _) => {      
          state.loading = {
            title: 'Goodbye',
            show: true
          }
        }),
        build.addCase(uploadImageProfile.pending || updateProfile.pending, (state, _) => {      
          state.loading = {
            title: 'Updating Profile',
            show: true
          }
        })
        
        /** Fulfilled */
        // build.addCase(createProject.fulfilled, (state, _) => {      
        //   state.loading = initialLoadingState;
        // })
        build.addCase(login.fulfilled || register.fulfilled || loginGoogle.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
        })
        build.addCase(logout.fulfilled, (state, _) => {      
          state.loading = initialLoadingState;
        })
        build.addCase(uploadImageProfile.fulfilled || updateProfile.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
          showNotification(`Profile Updated`, 'Your Profile Has Been Updated', 'success');  
        })

        /** Rejected */
        build.addCase(login.rejected, (state, _) => {          
          state.loading = initialLoadingState;
        })
        build.addCase(logout.rejected, (state, _) => {
          state.loading = initialLoadingState;
        })
        build.addCase(register.rejected, (state, _) => {
          state.loading = initialLoadingState;            
        })    
        build.addCase(uploadImageProfile.rejected || updateProfile.rejected, (state, _) => {
          state.loading = initialLoadingState;       
        })
      },
    });
  }

  slice: Slice<ActionsSliceState>
}

export const actionsSlice = new ActionsSlice();
export const { showLoading, toggleSideBar } = actionsSlice.slice.actions;
