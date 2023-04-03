import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkApi, showNotification } from '../utils/common';
import { CreateProjectRequest, UpdateProjectRequest } from './request/project';
import { Project } from '../models/project';
import { closeLoading } from '../redux/slice/actions';
import http from '../utils/constants';

const getProjectId = createAsyncThunk('getProjectId', async (id: number, thunkApi) => {
  handleThunkApi(thunkApi, 'Loading');
  return await http
    .get(`projects/${id}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error getProjectId -> ', err);
      showNotification('Get Project', `Error Get Project With Id ${id}`, 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const getProjects = createAsyncThunk('getUserProjects', async (_, thunkApi) => {
  return await http
    .get(`projects/user?page=1&pageSize=20`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error getProjects -> ', err);
      showNotification('Get Projects', `Error Gettings Projects`, 'danger');
      thunkApi.dispatch(closeLoading());
      return [];
    });
});

const createProject = createAsyncThunk('createProject', async (request: CreateProjectRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Creating Project');
  return await http
    .post('projects', request)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error createProject -> ', err);
      showNotification('Create Project', 'Error Creating Project', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const updateProject = createAsyncThunk('updateProject', async (request: UpdateProjectRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Updating Project');
  return await http
    .put(`projects/${request.id}`, request)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error updateProject -> ', err);
      showNotification('Update Project', 'Error Updating Project', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const deleteProject = createAsyncThunk('deleteProject', async (id: number, thunkApi) => {
  handleThunkApi(thunkApi, 'Deleting Project');
  return await http
    .delete(`projects/${id}`)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error deleteProject -> ', err);
      showNotification('Delete Project', 'Error Deleting Project', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

export { createProject, updateProject, deleteProject, getProjectId, getProjects };
