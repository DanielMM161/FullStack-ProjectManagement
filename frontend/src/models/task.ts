import { emptyUser, User } from './user';

interface TaskInitialState {
  tasks: Task[];
}

export enum Priority {
  low,
  medium,
  high,
}

export interface SubTask {
  id: number;
  title: string;
  done: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priorityTask: Priority;
  subTasks: SubTask[];
  comments: Comment[];
  users: User[];
  createdBy: User;
  dueDate: Date;
}

export const initialTaskValue: Task = {
  id: 0,
  title: '',
  description: '',
  priorityTask: Priority.low,
  subTasks: [],
  comments: [],
  users: [],
  createdBy: emptyUser,
  dueDate: new Date(),
};

export const initialTaskState: TaskInitialState = {
  tasks: [],
};
