import { BaseModel } from "../../models/baseModel";

export interface CreateProjectRequest  {
  name: string;
  description: string;
  usersId: number[];
}

export interface UpdateProjectRequest extends BaseModel {  
  name: string;
  description: string;
  usersId: number[];
}