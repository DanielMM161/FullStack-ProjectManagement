import { GenericState } from '../redux/slice/genericSlice';
import { User } from './user';

export interface Project {
  id: number;
  name: string;
  description: string;
  created: Date;
  users: User[];
  updatedAt: string;
}

export interface ProjectSliceState<T> extends GenericState<T> {  
  projectSelectedId: number;
  projectSelectedName: string;
  fetching: boolean;
}

export const initialProjectState: ProjectSliceState<Project> = {
  data: [],
  projectSelectedId: 0,
  projectSelectedName: 'Project',
  fetching: false,
};