export interface CreateSubTaskRequest {
  taskParentId: number;
  title: string;
  createdById: number;
}

export interface UpdateDoneSubTaskRequest {
  taskParentId: number;
  subTaskId: number;
  done: boolean;
}
