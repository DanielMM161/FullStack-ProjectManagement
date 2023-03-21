interface TaskInitialState {
  tasks: Task[];
}

export enum Priority {
  low,
  medium,
  high,
}

interface SubTask {
  id: number;
  title: string;
  done: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  subTasks?: SubTask[];
  dueDate: Date;  
}

export const initialTaskState: TaskInitialState = {
  tasks: [],
};
