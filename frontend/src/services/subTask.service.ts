import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../utils/constants';
import { CreateSubTaskRequest, UpdateDoneSubTaskRequest } from './request/subTask.request';

const createSubTask = createAsyncThunk('createSubTask', async (request: CreateSubTaskRequest) => {
  const token = JSON.parse(localStorage.getItem('token') ?? '');
  const response = await instance.post(`tasks/${request.taskParentId}/subtask`, {
    title: request.title,
    createdById: request.createdById
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) return response.data;

  return null;
});

const updateDoneSubTask = createAsyncThunk('updateDone', async (request: UpdateDoneSubTaskRequest) => {
    const token = JSON.parse(localStorage.getItem('token') ?? '');
    const response = await instance.patch(`tasks/${request.taskParentId}/subtask/${request.subTaskId}`, { done: request.done }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) return response.data;
  
    return null;
});


export { createSubTask, updateDoneSubTask }