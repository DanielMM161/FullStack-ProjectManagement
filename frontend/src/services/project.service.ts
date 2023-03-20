import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';
import { CreateProjectRequest, UpdateProjectRequest } from './request/project.request';

const getProjectId = createAsyncThunk('getProjectId', async (userId: number) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get(`projects/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  return null;
});

const getProjects = createAsyncThunk('getUserProjects', async () => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get(`projects/user?page=1&pageSize=20`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {    
    return response.data;
  }

  return [];
});

const createProject = createAsyncThunk('createProject', async (request: CreateProjectRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.post('projects', request, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  console.log("create project response", response)
  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const updateProject = createAsyncThunk('updateProject', async (request: UpdateProjectRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.put(`projects/${request.id}`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const deleteProject = createAsyncThunk('deleteProject', async (id: number) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.delete(`projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.status === 200) {
    return response.data;
  }

  return null;
});

export { createProject, updateProject, deleteProject, getProjectId, getProjects };
