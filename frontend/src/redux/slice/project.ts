import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Project, ProjectSliceState, initialProjectState } from '../../models/project';
import { createProject, getProjects, updateProject } from '../../services/project';
import { genericSlice, GenericState } from './genericSlice';

interface ProjectReducers {
  removeProject: CaseReducer<ProjectSliceState, PayloadAction<number>>  
}

export const projectSlice= genericSlice<ProjectSliceState, ProjectReducers & SliceCaseReducers<ProjectSliceState>>({  
  name: 'projectSlice',
  initialState: initialProjectState,
  reducers: {
    removeProject: (state, action) => {        
        state.data = state.data.filter((item) => item.id !== action.payload);
    },        
  },
  genericCalls: {
    getAll: getProjects
  }
})

export const { removeProject, setProject } = projectSlice.slice.actions;
