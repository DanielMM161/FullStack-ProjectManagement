export interface CreateTaskRequest {
  title: string;
  listId: number;
}

export interface TaskUserRequest {
  taskId: number;
  userId: number;
}

export interface UpdateTaskRequest {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}
