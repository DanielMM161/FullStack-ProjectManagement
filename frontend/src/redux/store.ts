import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { profileSlice } from './slice/ProfileSlice';
import { projectSlice } from './slice/ProjectSlice';
import { actionsSlice } from './slice/ActionsSlice';

export const store = configureStore({
  reducer: {
    profile: profileSlice.slice.reducer,
    projects: projectSlice.slice.reducer,
    actions: actionsSlice.slice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
