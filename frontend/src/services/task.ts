import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkApi, showNotification } from '../utils/common';
import instance from '../utils/constants';
import { CreateTaskRequest, TaskUserRequest, UpdateTaskRequest } from './request/task';
import { closeLoading } from '../redux/slice/actions';

const createTask = createAsyncThunk('createTask', async (request: CreateTaskRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Creating Task');
  return await instance
    .post('tasks', request)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error createTask -> ', err);
      showNotification('Create Task', 'Error Creating task', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const getTaskById = createAsyncThunk('getTaskById', async (id: number, thunkApi) => {
  return await instance
    .get(`tasks/${id}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error getTaskById -> ', err);
      showNotification('Task Detail', 'Error Fetching Task Detail', 'danger');
      return null;
    });
});

const removeUser = createAsyncThunk('removeUser', async (request: TaskUserRequest) => {
  return await instance
    .patch(`tasks/${request.taskId}/remove-user`, { userId: request.userId })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error removeUser -> ', err);
      showNotification('User Removed', 'Error Removing User', 'danger');
      return null;
    });
});

const assignUser = createAsyncThunk('assignUser', async (request: TaskUserRequest) => {
  return await instance
    .patch(`tasks/${request.taskId}/assign-user`, { userId: request.userId })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error assignUser -> ', err);
      showNotification('User Assigned', 'Error Assigning User', 'danger');
      return null;
    });
});

const updateTask = createAsyncThunk('updateTask', async (request: UpdateTaskRequest) => {
  return await instance
    .put(`tasks/${request.id}`, {
      title: request.title,
      description: request.description,
      priority: request.priority,
      dueDate: request.dueDate,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error updateTask -> ', err);
      showNotification('Update Task', 'Error Updating Task', 'danger');
      return null;
    });
});

const deleteTask = createAsyncThunk('deleteTask', async (id: number, thunkApi) => {
  return await instance
    .delete(`tasks/${id}`)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error deleteTask -> ', err);
      showNotification('Delete Task', 'Error Deleting Task', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

export { createTask, getTaskById, removeUser, assignUser, updateTask, deleteTask };
