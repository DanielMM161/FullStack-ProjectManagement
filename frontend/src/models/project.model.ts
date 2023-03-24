import { User } from './user.model';

export interface ProjectInitialState {
  projects: Project[];
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
};
