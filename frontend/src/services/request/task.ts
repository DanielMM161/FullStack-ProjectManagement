export interface CreateTaskRequest {
  title: string;
  listId: number;
}

export interface TaskUserRequest {  
  userId: number;
}

export interface UpdateTaskRequest {
  id: number;
  title: string;
  description: string;
  priorityTask: string;
  dueDate: string;
}
