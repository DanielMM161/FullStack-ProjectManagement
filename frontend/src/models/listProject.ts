import { Task } from './task';

export interface ListProject {
  id: number;
  title: string;
  tasks: Task[];
}
