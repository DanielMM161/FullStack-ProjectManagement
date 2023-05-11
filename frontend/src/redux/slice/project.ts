import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Project, ProjectSliceState, initialProjectState } from '../../models/project';
import { createProject, getProjects, updateProject } from '../../services/project';
import { genericSlice, GenericState } from './genericSlice';

interface ProjectReducers<T> {
  removeProject: CaseReducer<T, PayloadAction<number>>  
}

export const projectSlice = genericSlice<Project, ProjectSliceState<Project>, ProjectReducers<ProjectSliceState<Project>> & SliceCaseReducers<ProjectSliceState<Project>>>({  
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

export const { removeProject, setProject } = projectSlice.actions;
