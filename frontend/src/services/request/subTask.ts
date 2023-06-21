export interface CreateSubTaskRequest {  
  title: string;
  createdById: number;
}

export interface UpdateDoneSubTaskRequest {
  done: boolean;
}
