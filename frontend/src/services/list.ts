import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading } from '../models/loading';
import instance from '../utils/constants';
import { CreateListRequest, UpdateListRequest } from './request/list';
import { closeLoading, showLoading } from '../redux/slice/actions';
import { handleThunkApi, showNotification } from '../utils/common';

const createList = createAsyncThunk('createList', async (request: CreateListRequest, thunkApi) => {
  handleThunkApi(thunkApi, 'Creating List');
  return await instance
    .post('lists', request)
    .then((result) => {
      // thunkApi.dispatch(closeLoading())
      return result.data;
    })
    .catch((err) => {
      console.error('Error createList -> ', err);
      showNotification('Create List', 'Error Creating List', 'danger');
      thunkApi.dispatch(closeLoading());
      return null;
    });
});

const getListsByProject = createAsyncThunk('getListsByProject', async (projectId: number) => {
  return await instance
    .get(`lists/project/${projectId}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error getListsByProject -> ', err);
      showNotification('Get Lists', 'Error Fetching Lists', 'danger');
      return null;
    });
});

const updateList = createAsyncThunk('updateList', async (request: UpdateListRequest) => {
  return await instance
    .put(`lists/${request.id}`, { title: request.title })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.error('Error updateList -> ', err);
      showNotification('Update List', 'Error Updating Lists', 'danger');
      return null;
    });
});

const deleteList = createAsyncThunk('deleteList', async (id: number, thunkApi) => {
  handleThunkApi(thunkApi, 'Deleting List');
  return await instance
    .delete(`lists/${id}`)
    .then((result) => {
      thunkApi.dispatch(closeLoading());
      return result.data;
    })
    .catch((err) => {
      console.error('Error getListsByProject -> ', err);
      showNotification('Delete List', 'Error Deleting Lists', 'danger');
      thunkApi.dispatch(closeLoading());
      return false;
    });
});

export { createList, getListsByProject, deleteList, updateList };
