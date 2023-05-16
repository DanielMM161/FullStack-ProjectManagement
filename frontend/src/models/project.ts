import { GenericState } from '../redux/slice/BaseCrudSlice';
import { BaseModel } from './baseModel';
import { User } from './user';

export interface Project extends BaseModel {
  name: string;
  description: string;
  created: Date;
  users: User[];
  updatedAt: string;
}

export interface ProjectSliceState<T extends BaseModel> extends GenericState<T> {  
  projectSelectedId: number;
  projectSelectedName: string;  
}

export const initialProjectState: ProjectSliceState<Project> = {
  data: [],
  projectSelectedId: 0,
  projectSelectedName: 'Project',
  fetching: false,
};