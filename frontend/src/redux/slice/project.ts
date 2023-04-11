import { createSlice } from '@reduxjs/toolkit';
import { initialProjectState } from '../../models/project';
import { createProject, getProjects, updateProject } from '../../services/project';

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    removeProject: (state, action) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
    },
    setProject: (state, action) => {
      const { payload } = action;
      state.projectSelectedId = payload.id
      state.projectSelectedName = payload.name
    },
  },
  extraReducers: (build) => {
    /** Pending */
    build.addCase(getProjects.pending, (state, _) => {
      state.fetching = !state.fetching;
    });
    /** fulfilled */
    build.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.fetching = !state.fetching;
    });
    build.addCase(createProject.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload !== null) {
        state.projects.push(payload);
      }
    });
    build.addCase(updateProject.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload !== null) {
        const index = state.projects.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.projects[index] = payload;
        }
      }
    });
  },
});

export const { removeProject, setProject } = projectSlice.actions;

export default projectSlice.reducer;
