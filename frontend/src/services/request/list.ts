export interface CreateListRequest {
  title: string;
  projectId: number;
}

export interface UpdateListRequest {
  id: number;
  title: string;
}
