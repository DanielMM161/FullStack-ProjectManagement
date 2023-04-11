import { User } from './user';

export interface ProjectInitialState {
  projects: Project[];
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

export const initialProjectState: ProjectInitialState = {
  projects: [],
  projectSelectedId: 0,
  projectSelectedName: 'Project',
  fetching: false,
};
