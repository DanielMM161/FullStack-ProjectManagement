import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { profileSlice } from './slice/profile';
import { projectSlice } from './slice/project';
import { loadingSlice } from './slice/loading';
import { actionsSlice } from './slice/actions';

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    projects: projectSlice.reducer,
    actions: actionsSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
