import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '../utils/common';
import instance from '../utils/constants';
import { CreateSubTaskRequest, UpdateDoneSubTaskRequest } from './request/subTask';

const createSubTask = createAsyncThunk('createSubTask', async (request: CreateSubTaskRequest) => {
  return await instance
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
  return await instance
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
