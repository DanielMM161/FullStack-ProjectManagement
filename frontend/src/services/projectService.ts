import { Project } from '../models/project';
import { baseService } from './BaseCrudService';

const getProjectId = (url: string, id: number) => baseService.getById<Project>(url, id);

export { 
    getProjectId, 
};