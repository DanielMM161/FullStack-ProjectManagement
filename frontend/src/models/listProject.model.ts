import { Task } from './task.model';

export interface ListProject {
  id: number;
  title: string;
  tasks: Task[];
}
