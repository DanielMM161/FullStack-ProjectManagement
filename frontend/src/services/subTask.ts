import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '../utils/common';
import { CreateSubTaskRequest, UpdateDoneSubTaskRequest } from './request/subTask';
import api from '../api';

const createSubTask = createAsyncThunk('createSubTask', async (request: CreateSubTaskRequest) => {
  return await api
    .post(
      `tasks/${request.taskParentId}/subtask`,
      {
        title: request.title,
        createdById: request.createdById,
      }
    )
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.error('Error createSubTask -> ', err);
      showNotification('Add Subtask', 'Error Creating Subtask', 'danger');  
      return null;
    });
});

const updateDoneSubTask = createAsyncThunk('updateDone', async (request: UpdateDoneSubTaskRequest) => {  
  return await api
    .patch(`tasks/${request.taskParentId}/subtask/${request.subTaskId}`, { done: request.done })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.error('Error updateDoneSubTask -> ', err);
      showNotification('Aupdate SubTask', 'Error Updating Subtask', 'danger');  
      return null;
    });
});

export { createSubTask, updateDoneSubTask };
