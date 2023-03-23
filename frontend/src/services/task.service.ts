import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';
import { CreateTaskRequest, TaskUserRequest, UpdateTaskRequest } from './request/task.request';

const createTask = createAsyncThunk('createTask', async (request: CreateTaskRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.post('tasks', request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) return response.data;

  return null;
});

const getTaskById = createAsyncThunk('getTaskById', async (id: number) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.get(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) return response.data;

  return null;
});

const removeUser = createAsyncThunk('removeUser', async (request: TaskUserRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.patch(
    `tasks/${request.taskId}/remove-user`,
    { userId: request.userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 200) return response.data;

  return false;
});

const assignUser = createAsyncThunk('assignUser', async (request: TaskUserRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.patch(
    `tasks/${request.taskId}/assign-user`,
    { userId: request.userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 200) return response.data;

  return false;
});

const updateTask = createAsyncThunk('updateTask', async (request: UpdateTaskRequest) => {    
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.put(
    `tasks/${request.id}`,
    {
      title: request.title,
      description: request.description,
      priority: request.priority,
      dueDate: request.dueDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  
  if (response.status === 200) return response.data;

  return false;
});

const deleteTask = createAsyncThunk('createTask', async (id: number) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.delete(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) return response.data;

  return null;
});

export { createTask, getTaskById, removeUser, assignUser, updateTask, deleteTask };
