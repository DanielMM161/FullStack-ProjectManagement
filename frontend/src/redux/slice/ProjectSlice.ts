import { Project, initialProjectState } from '../../models/project';
import { BaseCrudSlice } from './BaseCrudSlice';
import { CreateProjectRequest, UpdateProjectRequest } from '../../services/request/project';

export const projectSlice = new BaseCrudSlice<Project, CreateProjectRequest, UpdateProjectRequest>('projectSlie', 'projects', initialProjectState);
export const { getAllAsync: getAllProjects, createAsync: createProject, updateAsync: updateProject, removeAsync: deleteProject  } = projectSlice