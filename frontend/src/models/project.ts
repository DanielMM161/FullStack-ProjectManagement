import { User } from './user';

export interface ProjectInitialState {
  projects: Project[];
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
  fetching: false,
};
