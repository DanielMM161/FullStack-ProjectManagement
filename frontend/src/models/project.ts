import { GenericState } from '../redux/slice/genericSlice';
import { User } from './user';

export interface ProjectInitialState {
  //projects: Project[];
  projectSelectedId: number;
  projectSelectedName: string;
  fetching: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  created: Date;
  users: User[];
  updatedAt: string;
}

export interface ProjectSliceState extends GenericState {
  data: Project[],
  projectSelectedId: number;
  projectSelectedName: string;
  fetching: boolean;
}

export const initialProjectState: ProjectSliceState = {
  data: [],
  projectSelectedId: 0,
  projectSelectedName: 'Project',
  fetching: false,
};