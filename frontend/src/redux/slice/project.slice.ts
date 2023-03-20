import { createSlice } from '@reduxjs/toolkit';

import { initialProjectState, Project, ProjectInitialState } from '../../models/project.model';
import { createProject, getProjects, updateProject } from '../../services/project.service';

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    removeProject: (state, action) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (build) => {
    /** fulfilled */
    build.addCase(getProjects.fulfilled, (state, action) => {      
      state.projects = action.payload;      
    });
    build.addCase(createProject.fulfilled, (state, action) => {
      console.log("create project fulfilled", action.payload)
      const { payload } = action;
      if (payload !== null) {
        state.projects.push(payload);
      }
    });
    // build.addCase(updateProject.fulfilled, (state, action) => {
    //   const { payload } = action;
    //   if (payload !== null) {
    //     const index = state.projects.findIndex((item) => item.id === payload.id);
    //     if (index !== -1) {
    //       state.projects[index] = payload;
    //     }
    //   }
    // });
  },
});

export const { removeProject } = projectSlice.actions;

export default projectSlice.reducer;
