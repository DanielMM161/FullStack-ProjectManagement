import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateListRequest, UpdateListRequest } from './request/list';
import { showNotification } from '../utils/common';
import { baseService } from './BaseCrudService';
import { ListProject } from '../models/listProject';

const createList = createAsyncThunk('createList', async (request: CreateListRequest, thunkbaseService) => { 
  return await baseService
    .post('lists', request)
    .then((result) => {      
      return result;
    })
    .catch((err) => {
      console.error('Error createList -> ', err);
      showNotification('Create List', 'Error Creating List', 'danger');
      return null;
    });
});

const getListsByProject = createAsyncThunk('getListsByProject', async (projectId: number) => {
  return await baseService
    .get(`lists/project/${projectId}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error('Error getListsByProject -> ', err);
      showNotification('Get Lists', 'Error Fetching Lists', 'danger');
      return null;
    });
});

const updateList = createAsyncThunk('updateList', async (request: UpdateListRequest) => {
  return await baseService
    .update<UpdateListRequest, ListProject>(`lists/${request.id}`, request)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error('Error updateList -> ', err);
      showNotification('Update List', 'Error Updating Lists', 'danger');
      return null;
    });
});

const deleteList = createAsyncThunk('deleteList', async (id: number, thunkbaseService) => {
  //handleThunkbaseService(thunkbaseService, 'Deleting List');
  return await baseService
    .remove('', id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error('Error getListsByProject -> ', err);
      showNotification('Delete List', 'Error Deleting Lists', 'danger');
      return false;
    });
});

export { createList, getListsByProject, deleteList, updateList };
