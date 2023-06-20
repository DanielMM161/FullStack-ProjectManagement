import { Slice, createSlice } from '@reduxjs/toolkit';
import { ActionsSliceState, initialActionsState, initialLoadingState } from '../../models/actions';
import { createProject } from './ProjectSlice';
import { getProfile, login, loginGoogle, logout, register, updateProfile, uploadImageProfile } from './ProfileSlice';
import { ErrorResponse } from '../../services/BaseCrudService';
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
        build.addCase(createProject.pending, (state, action) => {      
          state.loading = {
            title: 'Creating Project',
            show: true
          }
        }),
        build.addCase(login.pending || register.pending || loginGoogle.pending, (state, action) => {      
          state.loading = {
            title: 'Welcome',
            show: true
          }
        }),
        build.addCase(logout.pending, (state, action) => {      
          state.loading = {
            title: 'Goodbye',
            show: true
          }
        }),
        build.addCase(uploadImageProfile.pending || updateProfile.pending, (state, action) => {      
          state.loading = {
            title: 'Updating Profile',
            show: true
          }
        })
        
        /** Fulfilled */
        build.addCase(createProject.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
        })
        build.addCase(login.fulfilled || register.fulfilled || loginGoogle.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
        })
        build.addCase(logout.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
        })
        build.addCase(uploadImageProfile.fulfilled || updateProfile.fulfilled, (state, action) => {      
          state.loading = initialLoadingState;
          showNotification(`Profile Updated`, 'Your Profile Has Been Updated', 'success');  
        })

        /** Rejected */
        build.addCase(login.rejected, (state, action) => {
          const { payload } = action
          if (payload) {
            showNotification(`Login - ${payload.statusCode}`, payload.message , 'danger');
            state.loading = initialLoadingState;
          }
        })
        build.addCase(logout.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;  
          showNotification(`Logout - ${error.statusCode}`, `${error.message}`, 'danger');         
        })
        build.addCase(register.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;  
          showNotification(`Register - ${error.statusCode}`, `${error.message}`, 'danger');
          state.loading = initialLoadingState;            
        })
        build.addCase(loginGoogle.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;  
          showNotification(`Login Google - ${error.statusCode}`, `${error.message}`, 'danger');                 
        })
        build.addCase(uploadImageProfile.rejected || updateProfile.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;  
          showNotification(`Profile Updated - ${error.statusCode}`, `${error.message}`, 'danger');
          state.loading = initialLoadingState;       
        })
      },
    });
  }

  slice: Slice<ActionsSliceState>
}
export const actionsSlice = new ActionsSlice();
export const { showLoading, toggleSideBar } = actionsSlice.slice.actions;
