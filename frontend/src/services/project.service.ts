import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading } from '../models/loading.model';
import { showLoading } from '../redux/slice/loading.slice';
import { showNotification } from '../utils/common';
import instance from '../utils/constants';
import { CreateProjectRequest, UpdateProjectRequest } from './request/project.request';

const getProjectId = createAsyncThunk('getProjectId', async (userId: number, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Loading',
      show: true,
    } as Loading),
  );
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

const createProject = createAsyncThunk('createProject', async (request: CreateProjectRequest, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Creating Project',
      show: true,
    } as Loading),
  );
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.post('projects', request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  showNotification('Create Project', 'Error Creating Project', 'danger');
  return null;
});

const updateProject = createAsyncThunk('updateProject', async (request: UpdateProjectRequest, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Updating Project',
      show: true,
    } as Loading),
  );
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.put(`projects/${request.id}`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  showNotification('Update Project', 'Error Updating Project', 'danger');
  return null;
});

const deleteProject = createAsyncThunk('deleteProject', async (id: number, thunkApi) => {
  thunkApi.dispatch(
    showLoading({
      title: 'Deleting Project',
      show: true,
    } as Loading),
  );
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.delete(`projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  }

  showNotification('Delete Project', 'Error Deleting Project', 'danger');
  return null;
});

export { createProject, updateProject, deleteProject, getProjectId, getProjects };
