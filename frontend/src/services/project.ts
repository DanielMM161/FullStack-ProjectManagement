import { CreateProjectRequest, UpdateProjectRequest } from './request/project';
import { Project } from '../models/project';
import { getAll, post, get, remove, update } from './generService';

const getProjects = getAll<Project>('projects/user', 'getUserProjects');
const createProject = post<CreateProjectRequest, Project>('projects', 'createProject');
const getProjectId = get<Project>('projects', 'getProjectId');
const deleteProject = remove('projects', 'deleteProject');
const updateProject = update<UpdateProjectRequest, Project>('projects', 'updateProject');

export { createProject, updateProject, deleteProject, getProjectId, getProjects };
