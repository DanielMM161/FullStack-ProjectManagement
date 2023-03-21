export interface CreateProjectRequest {
  name: string;
  description: string;
  usersId: number[];
}

export interface UpdateProjectRequest extends CreateProjectRequest {
  id: number;
}
